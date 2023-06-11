const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

const getDormitory = require('../model/student/getDormitory');

exports.action = (req, res) => {
    console.log(req.body)
    const {building,room,action,quantity,type,condition,checkBox,searchSQL} = req.body;
    if(action=="search"){
        if(checkBox=="1"){
            searchsql = 'SELECT DB_Number, DB_Name,E_D_Dormitory_No,E_Type,E_D_Quantity,E_D_Condition, D_Capacity,D_Cost FROM dormitory_building NATURAL join dormitory NATURAL JOIN equipment NATURAL join equipment_in_dormitory WHERE DB_number= '+building+' AND E_D_dormitory_no = '+room +' AND D_building_no = DB_number AND E_number = E_D_Equipment_No AND E_D_Building_No = DB_Number AND E_D_Dormitory_No = D_Number AND E_D_Condition <> ""'
        }else{
            searchsql = 'SELECT DB_Number, DB_Name,E_D_Dormitory_No,E_Type,E_D_Quantity,E_D_Condition, D_Capacity,D_Cost FROM dormitory_building NATURAL join dormitory NATURAL JOIN equipment NATURAL join equipment_in_dormitory WHERE DB_number= '+building+' AND E_D_dormitory_no = '+room +' AND D_building_no = DB_number AND E_number = E_D_Equipment_No AND E_D_Building_No = DB_Number AND E_D_Dormitory_No = D_Number'
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
                    return res.render('supervisor_equipment', {
                        message:results,
                        Dormessage: result,
                        searchSQL:searchsql
                    });
                });
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
                                getDormitory(req).then(result => {
                                    // results.forEach(element => {
                                    //     element.dor = result
                                    // });
                                    console.log(results)
                                    return res.render('supervisor_equipment', {
                                        message:results,
                                        Dormessage: result,
                                        searchSQL:searchSQL
                                    });
                                });
                            }
                        })
                    }
                })
            }
        })
    }
    
}