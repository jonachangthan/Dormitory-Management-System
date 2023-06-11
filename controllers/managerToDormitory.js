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
                    return res.render('manager_to_dormitory', {
                        Buildingmessage:results,
                        Dormessage: result,
                        searchSQL:sql
                    });
                });
            }
        })
    }
    else if(action=="addDormitory"){
        sql = 'INSERT INTO dormitory_building (DB_Number , DB_Name,DB_Manager_ID) SELECT MAX( DB_Number)+1,'+'"'+buildingAdd+'"'+', "'+managerID+'" FROM dormitory_building;'
        //sql = 'INSERT INTO dormitory_building (DB_Name,DB_Manager_ID) VALUES ('+'"'+buildingAdd+'"'+', '+'"'+managerID+'" )'
        console.log(sql)
        db.query(sql, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                db.query('SELECT * FROM `dormitory_building` WHERE 1 ', (error, results) => {
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
                            return res.render('manager_to_dormitory', {
                                Buildingmessage:results,
                                Dormessage: result,
                                searchSQL:searchSQL
                            });
                        });
                    }
                })
            }
        })
    }
    else if(action=="updateDormitory"){
        //sql = 'UPDATE dormitory_building SET DB_Number = '+buildingNum+', DB_Name = '+'"'+building+'"'+',DB_Manager_ID = '+'"'+managerID+'" Where DB_Number = '+buildingNum
        sql = 'UPDATE dormitory_building SET DB_Number =' +buildingNum+', DB_Name = "'+building+'",DB_Manager_ID ="'+managerID+'" Where DB_Number = '+buildingNum+';'
        console.log(sql)
        db.query(sql, (error, results) => {
            if (error) {
                console.log(error)
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                db.query('SELECT * FROM `dormitory_building` WHERE 1 ', (error, results) => {
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
                            return res.render('manager_to_dormitory', {
                                Buildingmessage:results,
                                Dormessage: result,
                                searchSQL:searchSQL
                            });
                        });
                    }
                })
            }
        })
    }
    else if(action=="deleteDormitory"){
        sql = 'DELETE FROM dormitory_building Where DB_Number='+buildingNum
        console.log(sql)
        db.query(sql, (error, results) => {
            if (error) {
                console.log(error)
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                db.query('SELECT * FROM `dormitory_building` WHERE 1 ', (error, results) => {
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
                            return res.render('manager_to_dormitory', {
                                Buildingmessage:results,
                                Dormessage: result,
                                searchSQL:searchSQL
                            });
                        });
                    }
                })
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
                    return res.render('manager_to_dormitory', {
                        message:results,
                        Dormessage: result,
                        searchSQL:serachsql
                    });
                });
            }
        })
    }
    else if(action=="addRoom"){
        sql = 'INSERT INTO dormitory (D_Number , D_Building_No ,D_Capacity ,D_Cost) VALUES ('+room+','+building+','+capacity+','+cost+')'
        //sql = 'INSERT INTO  dormitory VALUES (6, '+'"'+dormitory_name+'",'+'"123")
        if(room==""){
            sql = 'INSERT INTO dormitory (D_Number , D_Building_No ,D_Capacity ,D_Cost) SELECT MAX( D_Number)+1,'+building+','+capacity+','+cost+' FROM dormitory Where D_Building_No = '+building+';'
            console.log(sql)
        }
        db.query(sql, (error, results) => {
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
                    return res.render('manager_to_dormitory', {
                        Dormessage: result,
                        searchSQL:searchSQL
                    });
                });
            }
        })
    }
    else if(action=='updateRoom'){
        sql = 'UPDATE dormitory SET D_Capacity ='+capacity+',D_Cost = '+cost+' Where D_Building_No = '+ buildingNumber+' AND D_Number = '+roomNumber+';'
        db.query(sql, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                //sql = 'UPDATE equipment_in_dormitory SET E_D_Quantity='+quantity+ ' ,E_D_Condition ='+'"'+condition+'"'+ ' WHERE E_D_Dormitory_No ='+room+' AND E_D_Building_No = '+building+' AND E_D_Equipment_No = '+results[0].E_Number;
                db.query(searchSQL, (error, results) => {
                    console.log("result: ",results);
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
                            return res.render('manager_to_dormitory', {
                                Dormessage: result,
                                searchSQL:searchSQL,
                                message:results
                            });
                        });
                    }
                })
            }
        })
    }
    else if(action=='deleteRoom'){
        sql = 'DELETE FROM dormitory Where D_Building_No = '+ buildingNumber+' AND D_Number = '+roomNumber+';'
        db.query(sql, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                //sql = 'UPDATE equipment_in_dormitory SET E_D_Quantity='+quantity+ ' ,E_D_Condition ='+'"'+condition+'"'+ ' WHERE E_D_Dormitory_No ='+room+' AND E_D_Building_No = '+building+' AND E_D_Equipment_No = '+results[0].E_Number;
                db.query(searchSQL, (error, results) => {
                    console.log("result: ",results);
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
                            return res.render('manager_to_dormitory', {
                                Dormessage: result,
                                searchSQL:searchSQL,
                                message:results
                            });
                        });
                    }
                })
            }
        })
    }
}