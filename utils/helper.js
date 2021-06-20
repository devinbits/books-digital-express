const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const { LIMIT } = require("./constants");
const { listPerPage } = require("./config");
const genKeyPair = require("./generateKeypair");

const pathToPriv = path.join(__dirname, "../utils", "id_rsa_priv.pem");
const pathToPub = path.join(__dirname, "../utils", "id_rsa_pub.pem");

function getPageOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function getRowsSafe(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

const getQuery = (
  table,
  attributes,
  orderBy,
  page = 1,
  limit = listPerPage
) => {
  // Get limit setting
  const pageStartOffset = getPageOffset(page, limit);

  // Get All attribute for where clause
  const attributeNames = Object.keys(attributes);

  // build query sections
  const selection = `SELECT * FROM ${table} `;
  const projections = attributeNames.reduce(
    (acc, property, i) =>
      `${acc} ${i == 0 ? "WHERE" : ""} ${[property]} like ? ${
        i === attributeNames.length - 1 ? "" : "OR "
      }`,
    ""
  );
  const orderby = `order by ${orderBy} `;

  // build query from sections
  const queryStr =
    selection +
    (attributes ? projections : "") +
    (orderBy ? orderby : "") +
    LIMIT;

  // build queryParams for query
  const queryParms = [
    ...Object.values(attributes).map((v) => `%${v}%`),
    `${pageStartOffset}`,
    `${limit}`,
  ];

  return { queryStr, queryParms };
};

const insertDataQuery = (table, columns) => {
  // Get All columns names
  const columnsNames = Object.keys(columns);
  const insertColumns = columnsNames.reduce(
    (acc, property, i) =>
      `${acc} ${[property]}${i === columnsNames.length - 1 ? " )" : ","} `,
    "("
  );

  const insertValueParams = columnsNames.reduce(
    (acc, property, i) =>
      `${acc} ${i === columnsNames.length - 1 ? "? )" : "?,"} `,
    "VALUES ("
  );

  // build query sections
  const insertTable = `INSERT INTO ${table} `;

  // build query from sections
  const queryStr = insertTable + insertColumns + insertValueParams;

  // build queryParams for query
  const queryParms = Object.values(columns).map((v) => v);

  return { queryStr, queryParms };
};

function getByColumn(table, column) {
  return `SELECT * from ${table} WHERE ${Object.keys(column)[0]} = ?`;
}

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(id) {
  const expiresIn = "1d";
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const PRIV_KEY = getKeys().privateKey;
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expiresIn: expiresIn,
  };
}

const validateAndGenerateKeys = () => {
  try {
    const publicKey = fs.readFileSync(pathToPriv);
    const privateKey = fs.readFileSync(pathToPub);
    console.log("Keys Found!!");
    return { publicKey, privateKey };
  } catch (err) {
    console.log("Generating New Keys!!");
    return genKeyPair();
  }
};

const keys = validateAndGenerateKeys();
const getKeys = () => keys;

module.exports = {
  getPageOffset,
  getRowsSafe,
  getQuery,
  getByColumn,
  validPassword,
  genPassword,
  issueJWT,
  insertDataQuery,
  getKeys,
};
