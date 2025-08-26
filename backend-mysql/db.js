const mysql = require("mysql2/promise");
require("dotenv").config();
// Create a connection pool to the MySQL database using environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// Export the connection pool for use in other modules
module.exports = pool;