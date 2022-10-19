const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// same thing here, NO NEED TO WRITE /api prefix because it was already defined in server.js
// ===== GET all parties from the database =====
router.get('/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
    db.query(sql, (err, rows) => {
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.json({message: 'success', data: rows});
    });
});

// ===== GET a single piece of data on parties from database =====
router.get('/party/:id', (req, res) => {
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
router.delete('/party/:id', (req, res) => {
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

module.exports = router;