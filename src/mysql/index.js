const mysql = require("mysql");
const config = require("./config");

let database = mysql.createConnection({
  localhost: config.localhost,
  user: config.user,
  password: config.password,
  database: config.database
});

database.connect();

module.exports = database;
