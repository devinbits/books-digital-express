const { query } = require("../db");
const { emptyOrRows, getPageOffset } = require("../../utils/helper");
const { listPerPage } = require("../../utils/config");
const { GET_ALL_USERS } = require("./constants");

async function getAllUsers(page = 1, limit = listPerPage) {
  const pageLimitOffset = getPageOffset(page, limit);
  const users = await emptyOrRows(query(GET_ALL_USERS));
  return { users, page };
}

module.exports = {
    getAllUsers
}