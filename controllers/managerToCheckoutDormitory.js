const db = require('../model/database');
//const token = require("token.js");
const e = require('express');

const sendMail = require('../mail');

const getDormitory = require('../model/student/getDormitory');

exports.action = (req, res) => {
    const {academicYear,action,building,name,sex,studentID,room,searchSQL} = req.body;
    console.log(req.body)

    if(action=="search"){
        //serchsql = 'SELECT * FROM student NATURAL JOIN dormitory_building  WHERE (DB_Number =S_Building_No OR S_Dormitory_NO is NULL ) AND '
        serchsql = 'SELECT * FROM student WHERE '
        //sql = 'SELECT * FROM student NATURAL JOIN dormitory_building WHERE DB_Number =S_Building_No AND ';
        if(studentID!=''){
            serchsql+='S_ID='+'"'+studentID+'"'+' AND ';
        }
        if(name!=''){
            serchsql+='S_Name='+'"'+name+'"'+' AND ';
        }
        if(academicYear!='選擇學年度'){
            serchsql+='S_Academic_Year= '+'"'+academicYear+'"'+' AND ';
        }
        // if(email!=''){
        //     sql+='S_Email Like '+'"%'+email+'%"'+' AND ';
        // }
        // if(phone!=''){
        //     sql+='S_Phone Like '+'"%'+phone+'%"'+' AND ';
        // }
        if(sex!='選擇性別'){
            serchsql+='S_Sex= '+'"'+sex+'"'+' AND ';
        }
        if(building!='選擇大樓'){
            serchsql+='S_Building_No= '+building+' AND ';
        }
        if(room!=''){
            serchsql+='S_Dormitory_No= '+room+' AND ';
        }
        if(serchsql == 'SELECT * FROM student WHERE '){
            serchsql = 'SELECT * FROM student WHERE S_Building_No is not NULL'
        }else{
            serchsql = serchsql.substring(0, serchsql.length-4);
            serchsql +='AND S_Building_No is not NULL GROUP BY S_ID'
        }
        // console.log(serchsql)
        db.query(serchsql, (error, results) => {
            // console.log(results)
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                searchsql2 = 'SELECT * FROM dormitory_building WHERE  '
                results.forEach(element => {
                    searchsql2+= 'DB_Number = '+element.S_Building_No +' OR '
                });
                searchsql2 = searchsql2.substring(0, searchsql2.length-3);
                //searchsql2 = 'SELECT * FROM dormitory_building WHERE DB_Number = '+results[0].S_Building_No
                // console.log(searchsql2)
                db.query(searchsql2, (error, results2) => {
                    // console.log(results)
                    if (error) {
                        res.render('error', {
                            err_message: "資料庫錯誤"
                        })
                    }
                    else {
                        console.log('result2',results2)
                        getDormitory(req).then(result => {
                            let i = 0;
                            results.forEach(element => {
                                results2.forEach(element2 => {  
                                    if(element.S_Building_No==element2.DB_Number){
                                        element.db = element2
                                    }                            
                                });
                                element.dor = result,
                                // element.db = results2[i];
                                i+=1;
                            });
                            console.log(results)
                            return res.render('manager_checkout_dormitory', {
                                message:results,
                                Dormessage: result,
                                searchSQL:serchsql
                            });
                        });
                    }
                })
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
                //search = 'SELECT * FROM student NATURAL JOIN dormitory_building  WHERE (DB_Number =S_Building_No OR S_Dormitory_NO is NULL ) AND S_ID='+'"'+studentID+'"  Limit 1'
                db.query(searchSQL, (error, results)=>{
                    searchsql2 = 'SELECT * FROM dormitory_building WHERE  '
                    results.forEach(element => {
                        searchsql2+= 'DB_Number = '+element.S_Building_No +' OR '
                    });
                    searchsql2 = searchsql2.substring(0, searchsql2.length-3);
                    db.query(searchsql2, (error, results2) => {
                        if (error) {
                            res.render('error', {
                                err_message: "資料庫錯誤"
                            })
                        }
                        else {
                            sql6 = 'SELECT S_Name,S_ID ,S_Email FROM student WHERE S_ID='+'"'+studentID+'"'
                            db.query(sql6, async (error, result6) => {
                                if (error) {
                                    console.log(error);
                                }
                                //* 若正確生成Email
                                else {
                                    let mailSubject = 'Checkout Dormitory';
                                    //const randomString = randomstring.generate();
                                    let content = '<p>' + result6[0].S_Name + '您好:\n \
                                    已經退宿成功';

                                    sendMail(result6[0].S_Email, mailSubject, content);

                                    getDormitory(req).then(result => {
                                        let i = 0;
                                        results.forEach(element => {
                                            results2.forEach(element2 => {  
                                                if(element.S_Building_No==element2.DB_Number){
                                                    element.db = element2
                                                }                            
                                            });
                                            element.dor = result,
                                            // element.db = results2[i];
                                            i+=1;
                                        });
                                        // console.log('result1',results)
                                        // console.log('result2',results2)
                                        return res.render('manager_checkout_dormitory', {
                                            message:results,
                                            Dormessage: result,
                                            searchSQL:searchSQL
                                        });
                                    });
                                }
                            });
                            // console.log('result2',results2)
                        }
                    })
                })
            }
        })
    }
}