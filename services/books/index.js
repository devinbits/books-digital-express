const { query } = require("../db");
const { getRowsSafe, getQuery, getAllById } = require("../../utils/helper");
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
  const queryStr = getAllById(TABLES.BOOKS);
  const result = await query(queryStr, [id]);
  return { result };
}

module.exports = {
  getBooks,
  getBooksById,
};
