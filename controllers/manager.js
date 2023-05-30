const db = require('../model/database');
//const token = require("./token.js");
const e = require('express');

exports.action = (req, res) => {
    const {id,name,phone,email,action} = req.body;
    if(action=="update"){
        sql = 'UPDATE manager SET M_Name='+'"'+name+'"'+ ' ,M_Email ='+'"'+email+'"'+', M_Phone='+'"'+phone+'"'+ ' WHERE M_ID='+'"'+id+'"';
        db.query(sql, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                db.query('SELECT * From manager Where ?',{ M_ID:req.user.UserName}, (error, results) => {
                    console.log(results)
                    if (error) {
                        res.render('error', {
                            err_message: "資料庫錯誤"
                          })
                    }
                    else {
                        return res.render('manager', {
                            message:results,
                        });
                    }
                })
            }
        })
    }else{
        db.query('SELECT * From manager Where ?',{ M_ID:req.user.UserName}, (error, results) => {
            // console.log(results)
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                  })
            }
            else {
                return res.render('manager', {
                    message:results,
                });
            }
        })
    }
}