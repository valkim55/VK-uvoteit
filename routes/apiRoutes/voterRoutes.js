const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// ===== GET all voters =====
router.get('/voters', (req, res) => {

    // sort the result in alphabetical order by last_name with sql built-in method
    const sql = `SELECT * FROM voters ORDER BY last_name`;
    db.query(sql, (err, rows) => {
        if(err) {
            return res.status(500).json({error: err.message});
        }
        res.json({message: 'success', data: rows});
    });
});

// ===== GET a single voter info =====
router.get('/voter/:id', (req, res) => {
    const sql = `SELECT * FROM voters WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
        if(err) {
            return res.status(400).json({error: err.message});
        }
        res.json({message: 'success', data: row});
    });
});

// ===== POST new voter information =====
router.post('/voter', ({body}, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'email');
    if(errors) {
        return res.status(400).json({error: errors});
    }

    const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.email];
    db.query(sql, params, (err, result) => {
        if(err) {
            return res.status(400).json({error: err.message});
        }
        res.json({message: 'success', data: body});
    });
});

// ===== PUT updated info to a voter object =====
router.put('/voter/:id', (req, res) => {
    // const errors = inputCheck(req.body, "email");
    // if(errors) {
    //     return res.status(400).json({error: errors});
    // }

    const sql = `UPDATE voters SET email = ? WHERE id = ?`;
    const params = [req.body.email, req.params.id];
    db.query(sql, params, (err, result) => {
        if(err) {
            return res.status(400).json({error: err.message});
        } else if(!result.affectedRows) {
            res.json({message: 'voter not found'});
        } else {
            res.json({message: 'success', data: req.body, changes: affectedRows});
        }
    });
});

// ===== DELETE voter info =====
router.delete('/voter/:id', (req, res) => {
    const sql = `DELETE FROM voters WHERE id = ?`;
    db.query(sql, req.params.id, (err, result) => {
        if(err) {
            res.status(400).json({error: err.message});
        } else if(!result.affectedRows) {
            res.json({message: 'voter not found'});
        } else {
            res.json({message: 'deleted', changes: result.affectedRows, id: req.params.id});
        }
    });
});


module.exports = router;