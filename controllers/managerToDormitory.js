const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

exports.action = (req, res) => {
    console.log(req.body)
    const {building,room,action,searchSQL,dormitory_name,room_name} = req.body;
    if(action=="search"){
        sql = 'SELECT DB_Number, DB_Name,D_Number FROM dormitory_building NATURAL join dormitory WHERE D_Building_No = DB_number AND DB_number= '+building+' AND D_Number =' +room +';'
        if(room==""){
            sql = 'SELECT DB_Number, DB_Name FROM dormitory_building WHERE DB_number= '+building+';'
        }
        db.query(sql, (error, results) => {
            console.log(results)
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                return res.render('manager_to_dormitory', {
                    message:results,
                    searchSQL:sql
                });
            }
        })
    }
    else if(action=="add"){
        sql = 'INSERT INTO  dormitory VALUES (6, '+'"'+dormitory_name+'",'+'"123")'
        if(room_name==""){
            sql = 'INSERT INTO  dormitory_building VALUES (6, '+'"'+dormitory_name+'",'+'"123")' 
        }
        db.query(sql, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                sql = "SELECT E_Number FROM equipment WHERE E_Type = "+"'"+type+"'"
                db.query(sql, (error, results) => {
                    if (error) {
                        res.render('error', {
                            err_message: "資料庫錯誤"
                        })
                    }
                    else {
                        db.query('INSERT INTO equipment_in_dormitory SET ?',{E_D_Dormitory_No:room , E_D_Building_No: building, E_D_Equipment_No: results[0].E_Number ,E_D_Quantity:quantity}, (error, results) => {
                            if (error) {
                                res.render('error', {
                                    err_message: "資料庫錯誤"
                                })
                            }
                            else {
                                return res.render('manager_to_dormitory');
                            }
                        })
                    }
                })
            }
        })
    }
//     else if(action=='update'){
//         sql = "SELECT E_Number FROM equipment WHERE E_Type = "+"'"+type+"'"
//         db.query(sql, (error, results) => {
//             if (error) {
//                 res.render('error', {
//                     err_message: "資料庫錯誤"
//                 })
//             }
//             else {
//                 sql = 'UPDATE equipment_in_dormitory SET E_D_Quantity='+quantity+ ' ,E_D_Condition ='+'"'+condition+'"'+ ' WHERE E_D_Dormitory_No ='+room+' AND E_D_Building_No = '+building+' AND E_D_Equipment_No = '+results[0].E_Number;
//                 db.query(sql, (error, results) => {
//                     console.log("result: ",results)
//                     if (error) {
//                         res.render('error', {
//                             err_message: "資料庫錯誤"
//                         })
//                     }
//                     else {
//                         db.query(searchSQL, (error, results) => {
//                             console.log(results)
//                             if (error) {
//                                 res.render('error', {
//                                     err_message: "資料庫錯誤"
//                                 })
//                             }
//                             else {
//                                 return res.render('manager_to_dormitory', {
//                                     message:results,
//                                     searchSQL:searchSQL
//                                 });
//                             }
//                         })
//                     }
//                 })
//             }
//         })
//     }
//     else if(action=='delete'){
//         sql = "SELECT E_Number FROM equipment WHERE E_Type = "+"'"+type+"'"
//         db.query(sql, (error, results) => {
//             if (error) {
//                 res.render('error', {
//                     err_message: "資料庫錯誤"
//                 })
//             }
//             else {
//                 db.query('DELETE FROM equipment_in_dormitory WHERE E_D_Dormitory_No ='+room+' AND E_D_Building_No = '+building+' AND E_D_Equipment_No = '+results[0].E_Number, (error, results) => {
//                     if (error) {
//                         res.render('error', {
//                             err_message: "資料庫錯誤"
//                         })
//                     }
//                     else {
//                         db.query(searchSQL, (error, results)=>{
//                             return res.render('manager_to_dormitory', {
//                                 message:results,
//                                 searchSQL:searchSQL
//                             })
//                         })
//                     }
//                 })
//             }
//         })
//     }
}