const TABLE = "Languages";
const LIMIT = "LIMIT ?,?";
const GET_ALL_USERS = `SELECT * from ${TABLE} LIMIT ?,?`;
const GET_USER_BY_ID = `SELECT * from ${TABLE} WHERE id = ?`;

module.exports = {
  GET_ALL_USERS,
  GET_USER_BY_ID,
};
