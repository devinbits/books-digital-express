const mysql = require("mysql2/promise");
const config = require("../utils/config");

async function query(sql, params) {
  console.log(sql, params);
  const connection = mysql.createPool(config.db);
  const [results] = await connection.execute(sql, params);
  return results;
}

module.exports = {
  query,
};
