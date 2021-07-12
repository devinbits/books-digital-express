const mysql = require("mysql2/promise");
const config = require("../utils/config");

const connection = mysql.createPool(config.db);

async function query(sql, params) {
  console.log(sql, params);
  const [results] = await connection.execute(sql, params);
  return results;
}

module.exports = {
  query,
};
