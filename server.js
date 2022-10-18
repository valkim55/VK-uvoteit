//const { json } = require('express');
const express = require('express');
const app = express();

// import sql package
const mysql = require('mysql2');

//import inputCHeck function
const inputCheck = require('./utils/inputCheck');

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
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({err: err.message});
            return;
        }
        res.json({message: 'success', data: rows});
    });
})


// ===== GET a single piece of data form database =====
app.get('/api/candidate/:id', (req,res) => {
    const sql = `SELECT * FROM candidates WHERE id=?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({message: err.message});
            return;
        }
        res.json({message: 'success', data: row});
    });
})

// ===== DELETE a  single piece of data from database
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id=?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({msg: err.msg});
        } else if(!result.affectedRows) {
            res.json({msg: 'candidate not found'});
        } else {
            res.json({message: 'deleted', changes: result.affectedRows, id: req.params.id});
        }
        
    });

})

// ===== CREATE a new piece of data into the database
app.post('/api/candidate', ({body}, res) => {
    const errors = inputCheck(body, 'fist_name', 'last_name', 'industry_connected');
    if(errors) {
        return res.sendStatus(400).json({error: errors});
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?,?)`;
        const params = [body.first_name, body.last_name, body.industry_connected];
        db.query(sql, params, (err,result) => {
            if(err) {
                return res.sendStatus(400).json({err: err.msg});
            }
            res.json({msg: 'success', data: body});
        });
})



//route handler for requests that aren't supported by app
app.use((req, res) => {
    res.status(400).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})