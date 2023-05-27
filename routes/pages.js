//! 頁面
const express = require('express');
const token = require("../controllers/token.js");
const db = require('../model/database');
const router = express.Router();

const readBulletin = require('../model/bulletinRead');
const readMessage = require('../model/messageRead');
const getManager = require('../model/student/getManager');
const getViolation = require('../model/student/getViolation');
const getDormitory = require('../model/student/getDormitory');
const getEquipment = require('../model/student/getEquipment');

//* 進入首頁view
router.get('/', token, (req, res) => {
    if (req.user.Permission) {
        //router.post('home_manager', authController.readBulletin);
        //router.post('../auth/readBulletin', authController.readBulletin);
        //router.post('/', getController.readBulletin);
        readBulletin().then(Bresult => {
            readMessage().then(Mresult => {
                return res.render('home_manager', {
                    Bmessage: Bresult,
                    Mmessage: Mresult,
                });

            })
        })
        //res.render('home_manager');
    }
    else {
        readBulletin().then(Bresult => {
            readMessage().then(Mresult => {
                return res.render('home_student', {
                    Bmessage: Bresult,
                    Mmessage: Mresult,
                });
            })
        })
    }
});

//* 進入註冊頁面view
/*
router.get('/register', (req, res) => {
    res.render('register');
});
*/

//* 進入登入頁面view
router.get('/login', (req, res) => {
    res.render('login');
});

//* 進入修改密碼頁面view
router.get('/change_password', (req, res) => {
    res.render('change_password');
});

//* 進入忘記密碼頁面view
router.get('/forget_password', (req, res) => {
    res.render('forget_password');
});

//! Manager
router.get('/manager_to_student', token, (req, res) => {
    if (req.user.Permission) {
        res.render('manager_to_student');
    }
});

router.get('/manager_to_apply', token, (req, res) => {
    if (req.user.Permission) {
        res.render('manager_to_apply');
    }
});

router.get('/manager_to_dormitory', token, (req, res) => {
    if (req.user.Permission) {
        res.render('manager_to_dormitory');
    }
});

router.get('/manager_to_violation', token, (req, res) => {
    if (req.user.Permission) {
        res.render('manager_to_violation');
    }
});

router.get('/manager_fix', token, (req, res) => {
    if (req.user.Permission) {
        res.render('manager_fix');
    }
});

//! Student
router.get('/student_to_manager', token, (req, res) => {
    getManager().then(result => {
        if (!req.user.Permission) {
            return res.render('student_to_manager', {
                message: result
            })
        }
    })
});

router.get('/student_to_apply', token, (req, res) => {
    if (!req.user.Permission) {
        let notapplied = true
        db.query('SELECT * From application Where ?', { A_Student_ID: req.user.UserName }, (error, results) => {
            results.forEach(element => {
                element.A_Date = element.A_Date.getFullYear() + '-' + (parseInt(element.A_Date.getMonth()) + 1) + '-' + element.A_Date.getDate()
                if (element.A_Approval == 2) {
                    element.A_Approval = "未審核"
                } else if (element.A_Approval == 1) {
                    element.A_Approval = "已核可"
                } else if (element.A_Approval == 0) {
                    element.A_Approval = "未核可"
                }
                if (element.A_Bill == 0) {
                    element.A_Bill = "未繳交"
                }
                else if (element.A_Bill == 1) {
                    element.A_Bill = "已繳交"
                }
            });
            if (error) {
                res.render('error', {
                    err_message: "資料庫錯誤"
                })
            }
            else {
                if (results.length == 0) {
                    notapplied = true
                }
                else {
                    notapplied = false
                }
                return res.render('student_to_apply', {
                    message: results,
                    notapplied: notapplied
                });
            }
        })
    }
});

router.get('/student_to_dormitory', token, (req, res) => {
    getDormitory(req).then(result => {
        if (!req.user.Permission) {
            return res.render('student_to_dormitory', {
                message: result
            })
        }
    })
});

router.get('/student_to_violation', token, (req, res) => {
    getViolation(req).then(result => {
        if (!req.user.Permission) {
            return res.render('student_to_violation', {
                message: result
            })
        }
    })
});

router.get('/student_fix', token, (req, res) => {
    getEquipment(req).then(result => {
        if (!req.user.Permission) {
            return res.render('student_fix', {
                message: result,
                searchSQL: sql
            })
        }
    })
});

router.get('/dormitory_detail', token, (req, res) => {
    if (!req.user.Permission) {
        res.render('dormitory_detail');
    }
});

router.get('/student_to_message', token, (req, res) => {
    if (!req.user.Permission) {
        readBulletin().then(Bresult => {
            readMessage().then(Mresult => {
                return res.render('student_to_message', {
                    Bmessage: Bresult,
                    Mmessage: Mresult,
                });
            })
        })
    }
});

router.get('/manager_to_message', token, (req, res) => {
    if (req.user.Permission) {
        readBulletin().then(Bresult => {
            readMessage().then(Mresult => {
                return res.render('manager_to_message', {
                    Bmessage: Bresult,
                    Mmessage: Mresult,
                });

            })
        })
    }
});

//* 建立module並export，導出建立好的router
module.exports = router;