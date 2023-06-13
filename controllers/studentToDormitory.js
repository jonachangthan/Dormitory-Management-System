const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

const getDormitory = require('../model/student/getDormitory');

exports.action = (req, res) => {
    console.log(req.body)
    const {buildingSearch,manager,buildingAdd,building,managerID,buildingNum,room, roomSearch,action,searchSQL,dormitory_name,room_name,capacity,cost,buildingNumber,roomNumber} = req.body;
    if(action=="searchDormitory"){
        sql = 'SELECT * FROM `dormitory_building` WHERE 1 '
        db.query(sql, (error, results) => {
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
                    return res.render('student_to_dormitory', {
                        Buildingmessage:results,
                        Dormessage: result,
                        searchSQL:sql
                    });
                });
            }
        })
    }
    if(action=="searchRoom"){
        serachsql = 'SELECT DB_Number, DB_Name,D_Number ,D_Building_No, D_Cost,D_Capacity FROM dormitory_building NATURAL join dormitory WHERE D_Building_No = DB_number AND DB_number= '+buildingSearch+' AND D_Number =' +roomSearch +';'
        if(roomSearch==""){
            serachsql = 'SELECT DB_Number, DB_Name,D_Number ,D_Building_No, D_Cost,D_Capacity FROM dormitory_building NATURAL join dormitory WHERE  D_Building_No = DB_number AND DB_number= '+buildingSearch+' Group By D_Number;'
        }
        db.query(serachsql, (error, results) => {
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
                    return res.render('student_to_dormitory', {
                        message:results,
                        Dormessage: result,
                        searchSQL:serachsql
                    });
                });
            }
        })
    }
    
}