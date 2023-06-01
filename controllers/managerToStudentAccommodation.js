const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

exports.action = (req, res) => {
    const {academicYear,action,building,name,sex,studentID,room,searchSQL} = req.body;
    if(action=="add"){
        if(studentID!=''){
            db.query('INSERT INTO student SET ?', { S_ID:studentID, S_Building_No:building, S_Name:name , S_Academic_Year:academicYear , S_Dormitory_No:room ,S_Phone:phone,S_Sex:sex}, (error, results) => {
                if (error) {
                    res.render('error', {
                        err_message: "資料庫錯誤"
                    })
                }
                else {
                    db.query('SELECT * FROM student WHERE ?', {S_ID:studentID}, (error, results)=>{
                        if(error){
                            res.render('error', {
                                err_message: "資料庫錯誤"
                            })
                        }else{
                            res.render('manager_studentAccommodation',{message : results})                            
                        }
                    })
                }
            })
        }
        else{
            res.render('manager_studentAccommodation', {
                err_message: "學生編號不能為空值"
            })
        }
    }else if(action=="search"){
        sql = 'SELECT * FROM student WHERE ';
        if(studentID!=''){
            sql+='S_ID='+'"'+studentID+'"'+' AND ';
        }
        if(department!='選擇系所'){
            sql+='S_Department='+'"'+department+'"'+' AND ';
        }
        if(name!=''){
            sql+='S_Name='+'"'+name+'"'+' AND ';
        }
        if(academicYear!='選擇學年度'){
            sql+='S_Academic_Year= '+'"'+academicYear+'"'+' AND ';
        }
        if(email!=''){
            sql+='S_Email Like '+'"%'+email+'%"'+' AND ';
        }
        if(phone!=''){
            sql+='S_Phone Like '+'"%'+phone+'%"'+' AND ';
        }
        if(sex!='選擇性別'){
            sql+='S_Sex= '+'"'+sex+'"'+' AND ';
        }
        if(sql == 'SELECT * FROM student WHERE '){
            sql = 'SELECT * FROM student'
        }else{
            sql = sql.substring(0, sql.length-4);
        }
        db.query(sql, (error, results) => {
            console.log(results)
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                return res.render('manager_studentAccommodation', {
                    message:results,
                    searchSQL:sql
                });
            }
        })
    }
}