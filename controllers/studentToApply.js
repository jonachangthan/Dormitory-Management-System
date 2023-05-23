const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

date = new Date()
Mdate = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate()

let notapplied = true

exports.apply = (req, res) => {
        db.query('SELECT * From student Where ?',{ S_ID:req.user.UserName}, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                  })
            }
            else {
                db.query('INSERT INTO application SET ?', { A_Student_ID : results[0].S_ID, A_Academic_Year:results[0].S_Academic_Year, A_Date:Mdate , A_Approval:2 , A_Bill:0 ,A_Semester:"上"}, (error, results) => {
                    if (error) {
                        res.render('error', {
                            err_message: "資料庫錯誤"
                        })
                    }
                    else {
                        db.query('SELECT * From application Where ?',{A_Student_ID:req.user.UserName}, (error, results) => {
                            results.forEach(element => {
                                element.A_Date = element.A_Date.getFullYear()+ '-' + (parseInt(element.A_Date.getMonth()) + 1) + '-' + element.A_Date.getDate()
                                if(element.A_Approval==2){
                                    element.A_Approval = "未審核"
                                }
                                if(element.A_Bill==0){
                                    element.A_Bill = "未繳交"
                                }
                            });
                            if (error) {
                                res.render('error', {
                                    err_message: "資料庫錯誤"
                                  })
                            }
                            else {
                                if(results.length==0){
                                    notapplied = true
                                }
                                else{
                                    notapplied = false
                                }
                                return res.render('student_to_apply', {
                                    message:results,
                                    notapplied:notapplied
                                });
                            }
                        })
                    }
                })
            }
        })
    
}

exports.delete = (req, res) => {
        db.query('DELETE FROM application Where ?',{A_Student_ID:req.user.UserName}, (error, results) => {
            if (error) {
                console.log(error)
            }
            else {
                return res.render('student_to_apply', {

                })
            }
        })

    
}
