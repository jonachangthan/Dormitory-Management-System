const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

const getDormitory = require('../model/student/getDormitory');

exports.action = (req, res) => {
    console.log(req.body)
    const {action,quantity,type,typeAdd,typeResearch,searchSQL} = req.body;
    if(action=="search"){
        searchsql = 'SELECT * FROM `equipment` WHERE 1'
        if(typeResearch==''){
            searchsql = 'SELECT * FROM `equipment` WHERE 1'
        }
        else{
            searchsql = 'SELECT * FROM `equipment` WHERE E_Type = "'+typeResearch+'"'
        }
        db.query(searchsql, (error, results) => {
            console.log(results)
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                getDormitory(req).then(result => {
                    // results.forEach(element => {
                    //     element.dor = result
                    // });
                    console.log(results)
                    return res.render('manager_equipment', {
                        Typemessage:results,
                        Dormessage: result,
                        searchSQL:searchsql
                    });
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
                searchsql = 'SELECT * FROM `equipment` WHERE 1'
                db.query(searchsql, (error, results) => {
                    console.log(results)
                    if (error) {
                        res.render('error', {
                            err_message: "資料庫錯誤"
                        })
                    }
                    else {
                        getDormitory(req).then(result => {
                            // results.forEach(element => {
                            //     element.dor = result
                            // });
                            console.log(results)
                            return res.render('manager_equipment', {
                                Typemessage:results,
                                Dormessage: result,
                                searchSQL:searchsql
                            });
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
                    getDormitory(req).then(result => {
                        // results.forEach(element => {
                        //     element.dor = result
                        // });
                        console.log(results)
                        return res.render('manager_equipment', {
                            Typemessage:results,
                            Dormessage: result,
                            searchSQL:searchSQL
                        });
                    });
                })
            }
        })
    }
}