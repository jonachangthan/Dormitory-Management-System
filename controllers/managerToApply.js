const db = require('../model/database');
const searchApply = require('../model/searchApply');
const sendMail = require('../mail');
const e = require('express');
const SqlString = require('mysql/lib/protocol/SqlString');

exports.action = (req, res) => {
    const {action, approval, bill, date, studentID, number, searchSQL} = req.body;
    if(action=="search"){
        sql = 'SELECT * FROM application WHERE ';
        if(studentID!=''){
            sql+='A_Student_ID='+studentID+' AND ';
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
        searchApply(sql).then((results) => {
            res.render('manager_to_apply', {
                message:results,
                searchSQL:sql,
            });
        }).catch((error) => {
            console.log(error)
            res.render('error')
        })
    }
    else if(action=="approval"){ //核准過後 直接隨機分發房間
        db.query('select S_Sex from student where ?', {S_ID:studentID}, (error, results) => {
            if (error) {
                console.log(error)
                res.render('error')
            }

            if(results[0].S_Sex=="男"){
                sql = 'select D_Number ,D_Building_No FROM dormitory where (D_Building_No=1 or D_Building_No=3 or D_Building_No=5) AND D_Capacity > D_Current_Quantity';
            }else if(results[0].S_Sex=="女"){
                sql = 'select D_Number ,D_Building_No FROM dormitory where (D_Building_No=2 or D_Building_No=4) AND D_Capacity > D_Current_Quantity';
            }

            db.query(sql, (error, rooms)=>{
                if (error) {
                    console.log(error)
                    res.render('error')
                }
                if(rooms.length != 0)
                {
                    // 隨機選擇房間
                    let rand = Math.floor(Math.random() * rooms.length);
                    let choose_dnum = rooms[rand].D_Number;
                    let choose_building = rooms[rand].D_Building_No;

                    // 更新宿舍資料表 目前住宿人數+1
                    db.query('update dormitory set D_Current_Quantity=D_Current_Quantity+1 where ? AND ?', [{D_Number:choose_dnum},{D_Building_No:choose_building}], (error)=>{
                        if (error) {
                            console.log(error)
                            res.render('error')
                        }
                        // 更新學生資料表 填入分發結果(房間編號、宿舍大樓編號)
                        db.query('UPDATE student SET  S_Dormitory_No='+'"'+choose_dnum+'"'+', S_Building_No= '+'"'+choose_building+'"' +"Where S_ID =" +'"'+studentID+'"', (error)=>{
                            if (error) {
                                console.log(error)
                                res.render('error')
                            }
                            db.query('UPDATE application SET A_Approval= 1 WHERE A_Number='+'"'+number+'"', (error) => {
                                if (error) {
                                    console.log(error)
                                    res.render('error')
                                }
                                searchApply(searchSQL).then((results) => {
                                    res.render('manager_to_apply', {
                                        message:results,
                                        searchSQL:searchSQL,
                                    });
                                }
                                ).catch((error) => {
                                    console.log(error)
                                    res.render('error')
                                }
                                )
                            })
                        })
                    })
                }
                else //所有房間已滿
                {
                    searchApply(searchSQL).then((results) => {
                        res.render('manager_to_apply', {
                            message:results,
                            full_message:"'房間已全數額滿 無法核可新申請",
                            searchSQL:searchSQL,
                        });
                    }).catch((error) => {
                        console.log(error)
                        res.render('error')
                    })
                }
            })
        })
    }
    else if(action=="deny"){
        sql = 'UPDATE application SET A_Approval= 0 WHERE A_Number='+'"'+number+'"';
        db.query(sql, (error) => {
            if (error) {
                console.log(error)
                res.render('error')
            }
            searchApply(searchSQL).then((results) => {
                res.render('manager_to_apply', {
                    message:results,
                    searchSQL:searchSQL,
                });
            }).catch((error) => {
                console.log(error)
                res.render('error')
            })            
        })
    }
}
exports.pay = (req, res) => {
    const {action, searchSQL, number, studentID} = req.body;
    if(action == "pay"){
        sql = 'UPDATE application SET A_Bill= 1 WHERE A_Number='+'"'+number+'"';
        db.query(sql, (error) => {
            if (error) {
                console.log(error)
                res.render('error')
            }
            searchApply(searchSQL).then((results) => {
                res.render('manager_to_apply', {
                    message:results,
                    searchSQL:searchSQL,
                });
            }).catch((error) => {
                console.log(error)
                res.render('error')
            })            
        })
    }else if(action == "info"){
        db.query('select S_Email from student where ?', {S_ID:studentID}, (error, results) => {
            if (error) {
                console.log(error)
                res.render('error')
            }

            let mailSubject = '宿舍費用繳費通知';
            let content = '親愛的學生您好，您的宿舍費用尚未繳交，請至宿舍管理系統下載繳費單，謝謝。';
            sendMail(results[0].S_Email, mailSubject, content);

            searchApply(searchSQL).then((results) => {
                res.render('manager_to_apply', {
                    message:results,
                    searchSQL:searchSQL,
                });
            }).catch((error) => {
                console.log(error)
                res.render('error')
            })            
        })
    }
}

exports.informAll = (req, res) => {
    const searchSQL = req.body.searchSQL;
    if(searchSQL == ''){
        res.render('manager_to_apply')
    }else{
        db.query(searchSQL, (error, results) => {
            if (error) {
                console.log(error)
                res.render('error')
            }
            
            results.forEach(element => {
                studentID = element.A_Student_ID;
                if(element.A_Bill == 0 && element.A_Approval == 1){
                    db.query('select S_Email from student where ?', {S_ID:studentID}, (error, results) => {
                        if (error) {
                            console.log(error)
                            res.render('error')
                        }
            
                        let mailSubject = '宿舍費用繳費通知';
                        let content = '親愛的學生您好，您的宿舍費用尚未繳交，請至宿舍管理系統下載繳費單，謝謝。';
                        sendMail(results[0].S_Email, mailSubject, content);
                    })
                }
            });

            searchApply(searchSQL).then((results) => {
                res.render('manager_to_apply', {
                    message:results,
                    searchSQL:searchSQL,
                });
            }).catch((error) => {
                console.log(error)
                res.render('error')
            })
        })
    }
}