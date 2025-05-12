require('dotenv').config();
const mysql = require('mysql2/promise');

// Create a connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Max number of connections in the pool
    queueLimit: 0,      // Unlimited queued requests
});

module.exports = { db }