const { query } = require("../db");
const { getRowsSafe, getQuery, getByColumn } = require("../../utils/helper");
const { TABLES } = require("../../utils/constants");

async function getBooks(projections = {}, page = 1, limit) {
  const { queryStr, queryParms } = getQuery(
    TABLES.BOOKS,
    projections,
    "name",
    page,
    limit
  );
  const books = await getRowsSafe(query(queryStr, queryParms));
  return books;
}

async function getBooksById(id = 0) {
  const queryStr = getByColumn(TABLES.BOOKS, { id });
  const result = await query(queryStr, [id]);
  return result[0];
}

module.exports = {
  getBooks,
  getBooksById,
};
