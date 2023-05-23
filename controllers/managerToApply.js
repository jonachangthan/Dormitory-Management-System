const db = require('../model/database');
//const token = require("token.js");
const e = require('express');
const SqlString = require('mysql/lib/protocol/SqlString');

exports.action = (req, res) => {
    const { academicYear,action,approval,bill,date,semester,studentID,number,searchSQL} = req.body;
    if(action=="search"){
        sql = 'SELECT * FROM application WHERE ';
        if(studentID!=''){
            sql+='A_Student_ID='+studentID+' AND ';
        }
        if(academicYear!='選擇學年度'){
            sql+='A_Academic_Year='+academicYear+' AND ';
        }
        if(semester!='選擇學期'){
            sql+='A_Semester='+'"'+semester+'"'+' AND ';
        }
        if(date!=''){
            sql+='A_Date='+'"'+date+'"'+' AND ';
        }
        if(approval!='審核狀況'){
            sql+='A_Approval='+approval+' AND ';
        }
        if(bill!='繳費狀況'){
            sql+='A_Bill='+bill+' AND ';
        }
        if(sql == 'SELECT * FROM application WHERE '){
            sql = 'SELECT * FROM application'
        }else{
            sql = sql.substring(0, sql.length-4);
        }
        db.query(sql, (error, results) => {         
            results.forEach(element => {
                element.A_Date = element.A_Date.getFullYear()+ '-' + (parseInt(element.A_Date.getMonth()) + 1) + '-' + element.A_Date.getDate()
                if(element.A_Approval==2){
                    element.A_Approval = "尚未審核"
                    element.boolean = true
                }
                else{
                    if(element.A_Approval==1){
                        element.A_Approval = "已核可"
                    }else{
                        element.A_Approval = "未核可"
                    }
                    element.boolean = false
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
                return res.render('manager_to_apply', {
                    message:results,
                    searchSQL:sql
                });
            }
        })
    }
    else if(action=="approval"){ //核准過後 直接隨機分發房間
        db.query('select S_Sex from student where ?', {S_ID:studentID}, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else 
            {
                if(results[0].S_Sex=="男"){
                    sql = 'select D_Number ,D_Building_No FROM dormitory where (D_Building_No=1 or D_Building_No=3 or D_Building_No=5) AND D_Capacity > D_Current_Quantity';
                }else if(results[0].S_Sex=="女"){
                    sql = 'select D_Number ,D_Building_No FROM dormitory where (D_Building_No=2 or D_Building_No=4) AND D_Capacity > D_Current_Quantity';
                }

                db.query(sql, (error, rooms)=>{
                    if (error) {
                        res.render('error', {
                            err_message: "資料庫錯誤"
                        })
                    }
                    else {
                        if(rooms.length != 0)
                        {
                            // 隨機選擇房間
                            let rand = Math.floor(Math.random() * rooms.length);
                            let choose_dnum = rooms[rand].D_Number;
                            let choose_building = rooms[rand].D_Building_No;

                            // 更新宿舍資料表 目前住宿人數+1
                            db.query('update dormitory set D_Current_Quantity=D_Current_Quantity+1 where ? AND ?', [{D_Number:choose_dnum},{D_Building_No:choose_building}], (error)=>{
                                if (error) {
                                    res.render('error', {
                                        err_message: "資料庫錯誤"
                                    })
                                }else{
                                    // 更新學生資料表 填入分發結果(房間編號、宿舍大樓編號)
                                    db.query('UPDATE student SET  S_Dormitory_No='+'"'+choose_dnum+'"'+', S_Building_No= '+'"'+choose_building+'"' +"Where S_ID =" +'"'+studentID+'"', (error)=>{
                                        if (error) {
                                            res.render('error', {
                                                err_message: "資料庫錯誤"
                                            })
                                        }else{
                                            db.query('UPDATE application SET A_Approval= 1 WHERE A_Number='+'"'+number+'"', (error, results) => {
                                                if (error) {
                                                    console.log(error)
                                                }
                                                else {
                                                    // 依據上一次查詢之條件 再查詢一次
                                                    db.query(searchSQL, (error, results) => {
                                                        results.forEach(element => {

                                                            // 對日期進行字串處理(要不然太長)
                                                            element.A_Date = element.A_Date.getFullYear()+ '-' + (parseInt(element.A_Date.getMonth()) + 1) + '-' + element.A_Date.getDate()

                                                            if(element.A_Approval==2){
                                                                element.A_Approval = "尚未審核"
                                                                element.boolean = true
                                                            }
                                                            else{
                                                                if(element.A_Approval==1){
                                                                    element.A_Approval = "已核可"
                                                                }else{
                                                                    element.A_Approval = "未核可"
                                                                }
                                                                element.boolean = false
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
                                                            return res.render('manager_to_apply', {
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
                            })
                        }
                        else //所有房間已滿
                        {
                             // 依據上一次查詢之條件 再查詢一次
                             db.query(searchSQL, (error, results) => {
                                results.forEach(element => {

                                    // 對日期進行字串處理(要不然太長)
                                    element.A_Date = element.A_Date.getFullYear()+ '-' + (parseInt(element.A_Date.getMonth()) + 1) + '-' + element.A_Date.getDate()

                                    if(element.A_Approval==2){
                                        element.A_Approval = "尚未審核"
                                        element.boolean = true
                                    }
                                    else{
                                        if(element.A_Approval==1){
                                            element.A_Approval = "已核可"
                                        }else{
                                            element.A_Approval = "未核可"
                                        }
                                        element.boolean = false
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
                                    return res.render('manager_to_apply', {
                                        message:results,
                                        full_message:"'房間已全數額滿 無法核可新申請",
                                        searchSQL:searchSQL
                                    });
                                }
                            })
                        }
                    }
                })
            }
        })
    }
    else if(action=="deny"){
        sql = 'UPDATE application SET A_Approval= 0 WHERE A_Number='+'"'+number+'"';
        db.query(sql, (error, results) => {
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                db.query(searchSQL, (error, results) => {
                    results.forEach(element => {
                        element.A_Date = element.A_Date.getFullYear()+ '-' + (parseInt(element.A_Date.getMonth()) + 1) + '-' + element.A_Date.getDate()
                        if(element.A_Approval==2){
                            element.A_Approval = "尚未審核"
                            element.boolean = true
                        }
                        else{
                            if(element.A_Approval==1){
                                element.A_Approval = "已核可"
                            }else{
                                element.A_Approval = "未核可"
                            }
                            element.boolean = false
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
                        return res.render('manager_to_apply', {
                             message:results,
                             searchSQL:searchSQL
                        });
                    }
                })
            }
        })
    }
}