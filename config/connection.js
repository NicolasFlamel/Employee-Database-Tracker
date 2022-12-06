const mysql = require('mysql2/promise');

async function getConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    return connection
}

module.exports = getConnection;