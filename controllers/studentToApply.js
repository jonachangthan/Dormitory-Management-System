const db = require('../model/database');
const getStudentDormitoryInfo = require('../model/student/getStudentDormitoryInfo');
const e = require('express');

date = new Date()
Mdate = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate()

exports.get = (req, res) => {
    db.query('SELECT * From application Where ?', { A_Student_ID: req.user.UserName }, (error, results) => {
        if (error) {
            console.log(error)
            res.render('error')
        }
        if(results.length==0){
            return res.render('student_to_apply', {
                notapplied: true
            });
        }
        results = results[0]

        let approval = results.A_Approval == 1 ? true : false

        results.A_Date = results.A_Date.getFullYear() + '-' + (parseInt(results.A_Date.getMonth()) + 1) + '-' + results.A_Date.getDate()
        if (results.A_Approval == 2) {
            results.A_Approval = "未審核"
        } else if (results.A_Approval == 1) {
            results.A_Approval = "已核可"
        } else{
            results.A_Approval = "未核可"
        }

        results.A_Bill = results.A_Bill == 0 ? "未繳交" : "已繳交"

        results = [results]
        
        if(!approval){
            html = `<link href="p1.css" rel="stylesheet" />
            <div class="container">
               <div class="progress-container">
               <div id="progress" class="progress"></div>
               <div class="circle active">
                 1 
                 <span style="color:black;font-weight:bold">已申請完畢 請等待管理員核可</span>
               </div>
               <div class="circle" style="  background-color: #215199;border-color: 94b7eb;">
                 2
               </div>
               <div class="circle" style="  background-color: #215199;border-color: 94b7eb;">
                 3
               </div>
             </div>
           </div> 
            `
                        
            return res.render('student_to_apply', {
                message: results,
                notapplied: false,
                approval: approval,
                html:html
            });
            
        }else if(results[0].A_Approval=="已核可" && results[0].A_Bill=="未繳交"){
                getStudentDormitoryInfo(req.user.UserName).then(result => {
                    room = result
                    html = `<link href="/p2.css" rel="stylesheet" />
                    <div class="container">
                    <div class="progress-container"> 
                        <div id="progress" class="progress"></div>
                        <div class="circle active">1
                            <span style="color:black;font-weight:bold">已申請完畢 請等待管理員核可</span>
                        </div>
                        <div class="circle active">2
                            <span style="color:black;font-weight:bold">已核可申請 您已分配到 ${room}</span>
                        </div>
                        <div class="circle" style=" background-color: #215199;border-color: 94b7eb;">3</div>
                    </div>
                    </div> `
                    return res.render('student_to_apply', {
                        message: results,
                        notapplied: false,
                        approval: approval,
                        html:html
                    });
                })
        }
        else{
            getStudentDormitoryInfo(req.user.UserName).then(result => {
                room = result
                html = `<link href="/p3.css" rel="stylesheet" />
                        <div class="container">
                        <div class="progress-container"> 
                            <div id="progress" class="progress"></div>
                            <div class="circle active">1
                                <span style="color:black;font-weight:bold">已申請完畢 請等待管理員核可</span>
                            </div>
                            <div class="circle active">2
                                <span style="color:black;font-weight:bold">已核可申請 您已分配到 ${room}</span>
                            </div>
                            <div class="circle">3
                                <span style="color:black;font-weight:bold">已繳交住宿費 完成申請流程</span>
                            </div>
                        </div>
                        </div> `
                return res.render('student_to_apply', {
                    message: results,
                    notapplied: false,
                    approval: approval,
                    html:html
                });
            })
        }
    })
}

exports.apply = (req, res) => {
    db.query('SELECT * From student Where ?',{ S_ID:req.user.UserName}, (error, results) => {
        if (error) {
            console.log(error)
            res.render('error')
        }
        db.query('INSERT INTO application SET ?',  
                { A_Student_ID : results[0].S_ID, A_Date:Mdate , A_Approval:2 , A_Bill:0}, (error) => {
            if (error) {
                console.log(error)
                res.render('error')
            }
            db.query('SELECT * From application Where ?',{A_Student_ID:req.user.UserName}, (error, results) => {
                if (error) {
                    console.log(error)
                    res.render('error')
                }
                results.forEach(element => {
                    element.A_Date = element.A_Date.getFullYear()+ '-' + (parseInt(element.A_Date.getMonth()) + 1) + '-' + element.A_Date.getDate()
                    if(element.A_Approval==2){
                        element.A_Approval = "未審核"
                    }
                    if(element.A_Bill==0){
                        element.A_Bill = "未繳交"
                    }
                });
                html = `<link href="p1.css" rel="stylesheet" />
                <div class="container">
                   <div class="progress-container">
                   <div id="progress" class="progress"></div>
                   <div class="circle active">
                     1 
                     <span style="color:black;font-weight:bold">已申請完畢 請等待管理員核可</span>
                   </div>
                   <div class="circle" style="  background-color: #215199;border-color: 94b7eb;">
                     2
                   </div>
                   <div class="circle" style="  background-color: #215199;border-color: 94b7eb;">
                     3
                   </div>
                 </div>
               </div> `
                return res.render('student_to_apply', {
                    message:results,
                    notapplied:false,
                    approval:false,
                    html:html
                });
            })
        })
    })
}

exports.delete = (req, res) => {
    db.query('DELETE FROM application Where ?',{A_Student_ID:req.user.UserName}, (error, results) => {
        if (error) {
            console.log(error)
        }
        else {
            return res.render('student_to_apply', {
                notapplied:true
            })
        }
    })
}

exports.bill = (req, res) => {
    sql = `SELECT s.S_ID, s.S_Name, s.S_Department, d.D_Cost
            FROM student s, dormitory d 
            WHERE s.S_Dormitory_No = d.D_Number AND s.S_Building_No = d.D_Building_No AND s.S_ID="${req.user.UserName}"`
    db.query(sql, (error, results) => {
        if (error) {
            console.log(error)
        }
        else {
            return res.render('bill', {
                student : results[0]
            })
        }
    })
}