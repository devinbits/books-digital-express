const { query } = require("../db");
const { getRowsSafe, getQuery, getByColumn } = require("../../utils/helper");
const { TABLES } = require("../../utils/constants");

async function getPublisherById(id = 0) {
  const queryStr = getByColumn(TABLES.PUBLISHERS, { id });
  const result = await query(queryStr, [id]);
  return result[0];
}

async function getPublishers(projections = {}, page = 1, limit) {
  const { queryStr, queryParms } = getQuery(
    TABLES.PUBLISHERS,
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
  getPublishers,
  getPublisherById,
};
