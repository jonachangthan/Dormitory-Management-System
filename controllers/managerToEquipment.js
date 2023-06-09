const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

exports.action = (req, res) => {
    console.log(req.body)
    const {building,room,action,quantity,type,condition,checkBox,searchSQL} = req.body;
    if(action=="search"){
        if(checkBox=="1"){
            sql = 'SELECT DB_Number, DB_Name,E_D_Dormitory_No,E_Type,E_D_Quantity,E_D_Condition, D_Capacity,D_Cost FROM dormitory_building NATURAL join dormitory NATURAL JOIN equipment NATURAL join equipment_in_dormitory WHERE DB_number= '+building+' AND E_D_dormitory_no = '+room +' AND D_building_no = DB_number AND E_number = E_D_Equipment_No AND E_D_Building_No = DB_Number AND E_D_Dormitory_No = D_Number AND E_D_Condition <> ""'
        }else{
            sql = 'SELECT DB_Number, DB_Name,E_D_Dormitory_No,E_Type,E_D_Quantity,E_D_Condition, D_Capacity,D_Cost FROM dormitory_building NATURAL join dormitory NATURAL JOIN equipment NATURAL join equipment_in_dormitory WHERE DB_number= '+building+' AND E_D_dormitory_no = '+room +' AND D_building_no = DB_number AND E_number = E_D_Equipment_No AND E_D_Building_No = DB_Number AND E_D_Dormitory_No = D_Number'
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
                    message:results,
                    searchSQL:sql
                });
            }
        })
    }
    else if(action=="add"){
        db.query('INSERT INTO equipment SET ?',{E_Type:type}, (error, results) => {
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
                                sql = 'SELECT DB_Number, DB_Name,E_D_Dormitory_No,E_Type,E_D_Quantity,E_D_Condition, D_Capacity,D_Cost FROM dormitory_building NATURAL join dormitory NATURAL JOIN equipment NATURAL join equipment_in_dormitory WHERE DB_number= '+building+' AND E_D_dormitory_no = '+room +' AND D_building_no = DB_number AND E_number = E_D_Equipment_No AND E_D_Building_No = DB_Number AND E_D_Dormitory_No = D_Number'
                                db.query(sql, (error, results)=>{
                                    return res.render('manager_equipment', {
                                        message:results,
                                        searchSQL:searchSQL
                                    })
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    else if(action=='update'){
        sql = "SELECT E_Number FROM equipment WHERE E_Type = "+"'"+type+"'"
        db.query(sql, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                sql = 'UPDATE equipment_in_dormitory SET E_D_Quantity='+quantity+ ' ,E_D_Condition ='+'"'+condition+'"'+ ' WHERE E_D_Dormitory_No ='+room+' AND E_D_Building_No = '+building+' AND E_D_Equipment_No = '+results[0].E_Number;
                db.query(sql, (error, results) => {
                    console.log("result: ",results)
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
                                return res.render('manager_equipment', {
                                    message:results,
                                    searchSQL:searchSQL
                                });
                            }
                        })
                    }
                })
            }
        })
    }
    else if(action=='delete'){
        sql = "SELECT E_Number FROM equipment WHERE E_Type = "+"'"+type+"'"
        db.query(sql, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                db.query('DELETE FROM equipment_in_dormitory WHERE E_D_Dormitory_No ='+room+' AND E_D_Building_No = '+building+' AND E_D_Equipment_No = '+results[0].E_Number, (error, results) => {
                    if (error) {
                        res.render('error', {
                            err_message: "資料庫錯誤"
                        })
                    }
                    else {
                        db.query(searchSQL, (error, results)=>{
                            return res.render('manager_equipment', {
                                message:results,
                                searchSQL:searchSQL
                            })
                        })
                    }
                })
            }
        })
    }
}