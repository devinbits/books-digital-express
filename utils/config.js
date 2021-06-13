const dotenv = require("dotenv");
dotenv.config();
const env = process.env;

const config = {
  db: {
    /* don't expose password or any sensitive info*/ host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
  listPerPage: 10,
};

module.exports = config;
