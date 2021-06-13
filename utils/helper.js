const { LIMIT } = require("./constants");
const { listPerPage } = require("./config");

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
  const selection = `SELECT * FROM ${table}`;
  const projections = attributeNames.reduce(
    (acc, property, i) =>
      `${acc} WHERE ${[property]} like ? ${
        i === attributeNames.length - 1 ? "" : i
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

module.exports = {
  getPageOffset,
  getRowsSafe,
  getQuery,
};
