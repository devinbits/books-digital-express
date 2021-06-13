const { query } = require("../db");
const { listPerPage } = require("../../utils/config");
const { TABLES } = require("../../utils/constants");
const { getPageOffset, getRowsSafe, getQuery } = require("../../utils/helper");

async function getAllBooks(projections = {}, page = 1, limit = listPerPage) {
  const { queryStr, queryParms } = getQuery(
    TABLES.BOOKS,
    projections,
    "name",
    page,
    limit
  );
  console.log(queryStr, queryParms);
  const books = await getRowsSafe(query(queryStr, queryParms));
  return books;
}

module.exports = {
  getAllBooks,
};
