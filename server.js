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
    }
);

// ===== GET all data in database =====
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id`;
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
    const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id WHERE candidates.id=?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({message: err.message});
            return;
        }
        res.json({message: 'success', data: row});
    });
})

// ===== CREATE a new piece of data into the database
app.post('/api/candidate', ({body}, res) => {
    const errors = inputCheck(body, 'fist_name', 'last_name', 'industry_connected');
    if(errors) {
        return res.sendStatus(400).json({error: errors});
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected, party_id) VALUES (?,?,?,?)`;
        const params = [body.first_name, body.last_name, body.industry_connected, party_id];
        db.query(sql, params, (err, result) => {
            if(err) {
                return res.sendStatus(400).json({err: err.msg});
            }
            res.json({msg: 'success', data: body, changes: result.affectedRows});
        });
});

// ===== UPDATE data in candidates from database =====
app.put('/api/candidate/:id', (req, res) => {
    // const errors = inputCheck(req.body, 'party_id');
    // if(errors) {
    //     return res.status(400).json({error: errors});
    // }
    
    const sql = `UPDATE candidates SET party_id=? WHERE id=?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({error: err.message});
        } else if(!result.affectedRows) {
            res.json({message: 'candidate not found'});
        } else {
            res.json({message: 'success', data: req.body, changes: result.affectedRows});
        }
    });
});

// ===== DELETE a  single piece of data from database
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id=?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if(err) {
            res.statusMessage(400).json({msg: err.msg});
        } else if(!result.affectedRows) {
            res.json({message: 'candidate not found'});
        } else {
            res.json({message: 'deleted', changes: result.affectedRows, id: req.params.id});
        }
        
    });

});


// ===== GET all parties from the database =====
app.get('/api/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
    db.query(sql, (err, rows) => {
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.json({message: 'success', data: rows});
    });
});

// ===== GET a single piece of data on parties from database =====
app.get('/api/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id=?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
        if(err) {
            return res.status(400).json({err: err.message});
        }
        res.json({message: 'success', data: row});
    });
});

// ===== DELETE a piece of data from parties in database =====
app.delete('/api/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id=?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({err: res.message});
        } else if(!result.affectedRows) {
            res.json({ message: 'party not found'});
        } else {
            res.json({message: 'deleted', changes: result.affectedRows, id: req.params.id});
        }
    });
});


//route handler for requests that aren't supported by app
app.use((req, res) => {
    res.status(400).end();
});

const PORT = process.env.PORT || 3001;
db.connect(err => {
    if(err)  throw err;
    console.log('connected to the election database')
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
});
