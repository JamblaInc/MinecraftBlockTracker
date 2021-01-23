const Pool = require("pg").Pool;

// Access our env variables
require("dotenv").config();

// Configure and connect to our database
const pool = new Pool({
  user: process.env.pgUser,
  password: process.env.pgPassword,
  host: process.env.pgHost,
  port: process.env.pgPort,
  database: process.env.pgDatabase,
});

module.exports = pool;
