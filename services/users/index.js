const { query } = require("../db");
const { getRowsSafe, getPageOffset } = require("../../utils/helper");
const { listPerPage } = require("../../utils/config");
const { GET_ALL_USERS, GET_USER_BY_ID } = require("./constants");

async function getAllUsers(page, limit = listPerPage) {
  const pageStartOffset = getPageOffset(page, limit);
  console.log(pageStartOffset, limit);
  const users = await getRowsSafe(
    query(GET_ALL_USERS, [`${pageStartOffset}`, `${limit}`])
  );
  return { users, page };
}

async function getUserById(id = 0) {
  const result = await query(GET_USER_BY_ID, [id]);
  return { result };
}

module.exports = {
  getAllUsers,
  getUserById,
};
