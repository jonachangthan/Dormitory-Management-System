const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

exports.action = (req, res) => {
    const {id,studentID,date,content,penality,action,searchSQL} = req.body;
    if(action=="add"){
        db.query('INSERT INTO violation_record SET ?', { VR_Date:date, VR_Content:content , VR_Penalty : penality , VR_Student_ID:studentID }, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                res.render('supervisor_to_violation')
            }
        })
    }
    else if(action=="search"){
        sql = 'SELECT * FROM violation_record WHERE ';
        if(studentID!=''){
            sql+='VR_Student_ID='+'"'+studentID+'"'+' AND ';
        }
        if(date!=''){
            sql+='VR_Date='+'"'+date+'"'+' AND ';
        }
        if(content!=''){
            sql+='VR_Content Like '+'"%'+content+'%"'+' AND ';
        }
        if(penality!=''){
            sql+='VR_Penalty Like '+'"%'+penality+'%"'+' AND ';
        }
        if(sql == 'SELECT * FROM violation_record WHERE '){
            sql = 'SELECT * FROM violation_record'
        }else{
            sql = sql.substring(0, sql.length-4);
        }
        db.query(sql, (error, results) => {
            results.forEach(element => {
                element.VR_Date = element.VR_Date.getFullYear()+ '-' + (parseInt(element.VR_Date.getMonth()) + 1) + '-' + element.VR_Date.getDate()
            });
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                return res.render('supervisor_to_violation', {
                    message:results,
                    searchSQL:sql
                });
            }
        })
    }
    else if(action=="update"){
        sql = 'UPDATE  violation_record SET VR_Content='+'"'+content+'"'+',VR_Penalty='+'"'+penality+'"'+ ' WHERE  VR_Number='+'"'+id+'"';
        db.query(sql, (error, results) => {
            if (error) {
                console.log(error);
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                db.query(searchSQL, (error, results) => {
                    results.forEach(element => {
                        element.VR_Date = element.VR_Date.getFullYear()+ '-' + (parseInt(element.VR_Date.getMonth()) + 1) + '-' + element.VR_Date.getDate()
                    });
                    if (error) {
                        res.render('error', {
                            err_message: "資料庫錯誤"
                        })
                    }
                    else {
                        return res.render('supervisor_to_violation', {
                            message:results,
                            searchSQL:searchSQL
                        });
                    }
                })
            }
        })
    }
    else if(action=="delete"){    
        
        db.query("DELETE FROM violation_record WHERE ?",{VR_Number:id}, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                db.query(searchSQL, (error, results) => {
                    results.forEach(element => {
                        element.VR_Date = element.VR_Date.getFullYear()+ '-' + (parseInt(element.VR_Date.getMonth()) + 1) + '-' + element.VR_Date.getDate()
                    });
                    if (error) {
                        console.log(error);
                    }
                    else {
                        return res.render('supervisor_to_violation', {
                            message:results,
                            searchSQL:searchSQL
                        });
                    }
                })
            }
        })
    }
}