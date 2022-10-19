const mysql = require('mysql2');

// connect to sql database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "KittyM2wm@w2023",
        database: "election"
    }
);




module.exports = db;