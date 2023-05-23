const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

exports.action = (req, res) => {
    console.log(req.body)
    db.query('SELECT * From manager;', (error, results) => {
        console.log(results)
        if (error) {
            res.render('error', {
                err_message: "資料庫錯誤"
            })
        }
        else {
            return res.render('student_to_manager', {
                message:results,
            });
        }
    })
    
}