const { query } = require("../db");
const { getRowsSafe, getQuery, getAllById } = require("../../utils/helper");
const { TABLES } = require("../../utils/constants");

async function getUserById(id = 0) {
  const queryStr = getAllById(TABLES.BOOKS);
  const result = await query(queryStr, [id]);
  return { result };
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

module.exports = {
  getUsers,
  getUserById,
};
