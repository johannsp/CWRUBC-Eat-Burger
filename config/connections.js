// Set up MySQL connection.
const mysql = require("mysql");

// When deployed get the setup by expanding the JAWSDB_URL environment variable
// OR otherwise hard-code for localhost, in which case instead of a blank
// password assume existence of a hidden .mysql file that holds the password.
// Adjust relative path to this .mysql file as appropriate.
const mysqlSetup = process.env.JAWSDB_URL ||
{
  host: "localhost",
  port: 3306,
  user: "root",
  // Read password from single line file with IIFE expression
  password: (() => String(fs.readFileSync("../config/.mysql")).trim())(),
  database: "burgers_db"
}
const connection = mysql.createConnection(mysqlSetup);

// Make connection.
connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
