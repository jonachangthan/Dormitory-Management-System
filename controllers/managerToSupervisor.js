const db = require('../model/database');
const getSupervisor = require('../model/student/getSupervisor');
const e = require('express');

exports.modify = (req, res) => {
    const {email, phone, M_ID} = req.body;

    const sql = `UPDATE manager SET M_Phone = '${phone}', M_Email = '${email}' WHERE M_ID = '${M_ID}'`;

    db.query(sql, (error, results) => {
        if (error) {
            console.log(error)
            res.render('error')
        }
        else {
            getSupervisor().then(result => {
                return res.render('manager_to_supervisor', {
                    message: result
                })
            })
        }
    })
}

