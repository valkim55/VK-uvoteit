const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//NO NEED TO WRITE /api prefix in the path here because it was already defined in server.js
// ===== GET all data in database =====
router.get('/candidates', (req, res) => {
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
router.get('/candidate/:id', (req,res) => {
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
router.post('/candidate', ({body}, res) => {
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
router.put('/candidate/:id', (req, res) => {
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
router.delete('/candidate/:id', (req, res) => {
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


module.exports = router;