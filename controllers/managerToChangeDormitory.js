const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

const getDormitory = require('../model/student/getDormitory');
const sendMail = require('../mail');

exports.action = (req, res) => {
    const {action,studentID1,studentID2,building,room1,room2} = req.body;
    //console.log(req.body)
    if(action=="change"){
        sql1 = 'SELECT * FROM student Where S_ID = '+'"'+studentID1+'"'+' AND S_Building_NO = '+building+' AND S_Dormitory_No = '+room1
        db.query(sql1, (error, results1) => {
            if (error || results1.length!=1) {
                return res.render('manager_change_dormitory', {
                    ErrMessage:"學生一資料錯誤"
                });
            }
            else {
                //console.log('result1 : ',results1.length)
                sql2 = 'SELECT * FROM student Where S_ID = '+'"'+studentID2+'"'+' AND S_Building_NO = '+building+' AND S_Dormitory_No = '+room2
                db.query(sql2, (error, results2) => {
                    if (error ||results2.length!=1) {
                        return res.render('manager_change_dormitory', {
                            ErrMessage:"學生二資料錯誤"
                        });
                    }
                    else {
                        sql3 = 'UPDATE  student SET S_Dormitory_No = '+room2+ ' WHERE  S_ID='+'"'+studentID1+'"'
                        db.query(sql3, (error, results3) => {
                            if (error) {
                                return res.render('manager_change_dormitory', {
                                    ErrMessage:"資料庫錯誤"
                                });
                            }
                            else {
                                sql4 = 'UPDATE  student SET S_Dormitory_No = '+room1+ ' WHERE  S_ID='+'"'+studentID2+'"'
                                db.query(sql4, (error, results4) => {
                                    if (error) {
                                        return res.render('manager_change_dormitory', {
                                            ErrMessage:"資料庫錯誤"
                                        });
                                    }
                                    else {
                                        sql5 = 'SELECT S_Name,S_ID ,S_Email FROM student WHERE S_ID='+'"'+studentID1+'"'
                                        db.query(sql5, async (error, result5) => {
                                            if (error) {
                                                console.log(error);
                                            }
                                            //* 若正確生成Email
                                            else {
                                                //console.log('result5 : ',result5[0])
                                                let mailSubject = 'Change Dormitory';
                                                //const randomString = randomstring.generate();
                                                let content = '<p>' + result5[0].S_Name + '您好:\n \
                                                已經與 '+studentID2+' 換宿成功';

                                                sendMail(result5[0].S_Email, mailSubject, content);

                                                sql6 = 'SELECT S_Name,S_ID ,S_Email FROM student WHERE S_ID='+'"'+studentID2+'"'
                                                db.query(sql6, async (error, result6) => {
                                                    if (error) {
                                                        console.log(error);
                                                    }
                                                    //* 若正確生成Email
                                                    else {
                                                        let mailSubject = 'Change Dormitory';
                                                        //const randomString = randomstring.generate();
                                                        let content = '<p>' + result6[0].S_Name + '您好:\n \
                                                        已經與 '+studentID1+' 換宿成功';

                                                        sendMail(result6[0].S_Email, mailSubject, content);

                                                        getDormitory(req).then(result => {
                                                            return res.render('manager_change_dormitory', {
                                                                Dormessage: result,
                                                                ErrMessage:"換宿成功"
                                                            });
                                                        });
                                                    }
                                                });
                                            }
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
}