function getPageOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function getRowsSafe(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
  getPageOffset,
  getRowsSafe,
};
