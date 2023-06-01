const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

const getDormitory = require('../model/student/getDormitory');

exports.action = (req, res) => {
    const {academicYear,action,building,name,sex,studentID,room,searchSQL} = req.body;
    console.log(req.body)
    if(action=="update"){
        sql = 'UPDATE  student SET S_Building_No ='+building + ',S_Dormitory_No = '+room+ ' WHERE  S_ID='+'"'+studentID+'"';
        console.log(sql)
        db.query(sql, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                db.query(searchSQL, (error, results)=>{
                    getDormitory(req).then(result => {
                        results.forEach(element => {
                            element.dor = result
                        });
                        console.log(results)
                        return res.render('manager_studentAccommodation', {
                            message:results,
                            Dormessage: result,
                            searchSQL:sql
                        });
                    });
                })
            }
        })
    }else if(action=="search"){
        sql = 'SELECT * FROM student NATURAL JOIN dormitory_building WHERE DB_Number =S_Building_No AND ';
        if(studentID!=''){
            sql+='S_ID='+'"'+studentID+'"'+' AND ';
        }
        if(name!=''){
            sql+='S_Name='+'"'+name+'"'+' AND ';
        }
        if(academicYear!='選擇學年度'){
            sql+='S_Academic_Year= '+'"'+academicYear+'"'+' AND ';
        }
        // if(email!=''){
        //     sql+='S_Email Like '+'"%'+email+'%"'+' AND ';
        // }
        // if(phone!=''){
        //     sql+='S_Phone Like '+'"%'+phone+'%"'+' AND ';
        // }
        if(sex!='選擇性別'){
            sql+='S_Sex= '+'"'+sex+'"'+' AND ';
        }
        if(building!='選擇大樓'){
            sql+='S_Building_No= '+building+' AND ';
        }
        if(room!=''){
            sql+='S_Dormitory_No= '+room+' AND ';
        }
        if(sql == 'SELECT * FROM student WHERE '){
            sql = 'SELECT * FROM student'
        }else{
            sql = sql.substring(0, sql.length-4);
        }
        console.log(sql)
        db.query(sql, (error, results) => {
            // console.log(results)
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                getDormitory(req).then(result => {
                    results.forEach(element => {
                        element.dor = result
                    });
                    console.log(result)
                    return res.render('manager_studentAccommodation', {
                        message:results,
                        Dormessage: result,
                        searchSQL:sql
                    });
                });
            }
        })
    }
    else if(action=="delete"){  
        sql = 'UPDATE  student SET S_Building_No = NULL ,S_Dormitory_No = NULL WHERE  S_ID='+'"'+studentID+'"';
        console.log(sql)
        db.query(sql, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                db.query(searchSQL, (error, results)=>{
                    getDormitory(req).then(result => {
                        console.log(results)
                        return res.render('manager_studentAccommodation', {
                            message:results,
                            Dormessage: result
                        });
                    });
                })
            }
        })
    }
}