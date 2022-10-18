const express = require('express');
const app = express();

// import sql package
const mysql = require('mysql2');

// express middleware to parse incoming data
app.use(express());
app.use(express.urlencoded({extended: false}));

// connect to sql database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "KittyM2wm@w2023",
        database: "election"
    },
    console.log('connected to the election database')
);

// ===== GET all data in database =====
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// ===== GET a single piece of data form database =====
// db.query(`SELECT * FROM candidates WHERE id=15`, (err, row) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(row);
// });

// ===== DELETE a  single piece of data from database
// db.query(`DELETE FROM candidates WHERE id=?`, 1, (err, result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// ===== CREATE a new piece of data into the database
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)`;
// const params = [1, 'Harry', 'Potter', 1];
// db.query(sql, params, (err,result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });

//route handler for requests that aren't supported by app
app.use((req, res) => {
    res.status(400).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})