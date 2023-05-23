const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

date = new Date()
Mdate = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate()

let notapplied = true

exports.action = (req, res) => {
    const {building,room,action,quantity,condition,searchSQL,type} = req.body;
    sql = 'UPDATE equipment_in_dormitory SET  E_D_Condition ='+'"'+condition+'"'+ ' WHERE E_D_Dormitory_No ='+room+' AND E_D_Building_No = '+building+' AND E_D_Equipment_No = '+type;
    db.query(sql, (error, results) => {
        if (error) {
            res.render('error', {
                err_message: "資料庫錯誤"
            })
        }
        else {
            db.query(searchSQL, (error, results) => {
                console.log(results)
                if (error) {
                    res.render('error', {
                        err_message: "資料庫錯誤"
                    })
                }
                else {
                    return res.render('student_fix', {
                        message:results,
                        searchSQL:searchSQL
                    });
                }
            })
        }
    })
}
