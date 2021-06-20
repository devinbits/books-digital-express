const { query } = require("../db");
const {
  getRowsSafe,
  getQuery,
  getByColumn,
  insertDataQuery,
  issueJWT,
  genPassword,
  validPassword,
} = require("../../utils/helper");
const { TABLES } = require("../../utils/constants");

async function getUserById(id = 0) {
  const queryStr = getByColumn(TABLES.USERS, { id });
  const result = await query(queryStr, [id]);
  return result[0];
}

async function getUserByEmail(email = "") {
  const queryStr = getByColumn(TABLES.USERS, { email });
  const result = await query(queryStr, [email]);
  return result[0];
}

async function getUsers(projections = {}, page = 1, limit) {
  const { queryStr, queryParms } = getQuery(
    TABLES.USERS,
    projections,
    "name",
    page,
    limit
  );
  console.log(queryStr, queryParms);
  const users = await getRowsSafe(query(queryStr, queryParms));
  return users;
}

async function loginUser(user) {
  const { email, password } = user;

  const existingUser = await getUserByEmail(email);
  console.log("existingUser", existingUser);
  if (!existingUser)
    return { success: false, message: "No user is registered with this email" };

  const isValidPassword = validPassword(
    password,
    existingUser.hash,
    existingUser.salt
  );

  if (isValidPassword) {
    const { token, expiresIn } = issueJWT(existingUser.id);
    return { success: true, token, expiresIn, id: existingUser.id };
  } else {
    return { success: false, message: "Invalid Password" };
  }
}

async function registerNewUser(user) {
  const { name, email, password, phone, nationalId: national_id } = user;

  const existingUser = await getUserByEmail(email);
  if (existingUser)
    return { success: false, message: "User already registed with this email" };

  const saltHash = genPassword(password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = { name, email, phone, national_id, hash, salt };
  const { queryStr, queryParms } = insertDataQuery(TABLES.USERS, newUser);
  const result = await query(queryStr, queryParms);

  if (result && result.affectedRows) {
    const { token, expiresIn } = issueJWT(result.insertId);
    return { success: true, token, expiresIn };
  }
  return {
    success: false,
    message: "Registration failed! Internal Server Error",
  };
}

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  registerNewUser,
  loginUser,
};
