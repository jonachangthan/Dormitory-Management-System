const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

exports.action = (req, res) => {
    const {id,name,sex,academicYear,phone,email,action,department} = req.body;
    if(action=="update"){
        sql = 'UPDATE student SET S_Email ='+'"'+email+'"'+', S_Phone='+'"'+phone+'"'+ ' WHERE S_ID='+'"'+id+'"';
        db.query(sql, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                db.query('SELECT * From student Where ?',{ S_ID:req.user.UserName}, (error, results) => {
                    if (error) {
                        res.render('error', {
                            err_message: "資料庫錯誤"
                          })
                    }
                    else {
                        return res.render('student', {
                            message:results,
                        });
                    }
                })
            }
        })
    }else{
        db.query('SELECT * From student Where ?',{ S_ID:req.user.UserName}, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                  })
            }
            else {
                return res.render('student', {
                    message:results,
                });
            }
        })
    }
}