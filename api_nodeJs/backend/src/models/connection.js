const mysql = require( 'mysql2/promise' );
const dotenv = require('dotenv').config();

const connetion = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    namedPlaceholders: true,
});

module.exports = connetion;