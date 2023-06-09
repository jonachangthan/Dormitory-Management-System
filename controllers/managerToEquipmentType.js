const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

exports.action = (req, res) => {
    console.log(req.body)
    const {action,quantity,type,typeAdd,typeResearch,searchSQL} = req.body;
    if(action=="search"){
        sql = 'SELECT * FROM `equipment` WHERE 1'
        if(typeResearch==''){
            sql = 'SELECT * FROM `equipment` WHERE 1'
        }
        else{
            sql = 'SELECT * FROM `equipment` WHERE E_Type = "'+typeResearch+'"'
        }
        db.query(sql, (error, results) => {
            console.log(results)
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                return res.render('manager_equipment', {
                    Typemessage:results,
                    searchSQL:sql
                });
            }
        })
    }
    else if(action=="add"){
        db.query('INSERT INTO equipment SET ?',{E_Type:typeAdd}, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                sql = 'SELECT * FROM `equipment` WHERE 1'
                db.query(sql, (error, results) => {
                    console.log(results)
                    if (error) {
                        res.render('error', {
                            err_message: "資料庫錯誤"
                        })
                    }
                    else {
                        return res.render('manager_equipment', {
                            Typemessage:results,
                            searchSQL:sql
                        });
                    }
                })
            }
        })
    }
    else if(action=='delete'){
        sql = 'DELETE FROM equipment WHERE E_Type ="'+type+'"'
        db.query(sql, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                db.query(searchSQL, (error, results)=>{
                    return res.render('manager_equipment', {
                        Typemessage:results,
                        searchSQL:searchSQL
                    })
                })
            }
        })
    }
}