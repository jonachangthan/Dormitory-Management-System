//! 驗證
const express = require('express');
const authController = require('../controllers/auth'); // 往上層

const router = express.Router();

//* 進入register controller，處理註冊資料
//router.post('/register', authController.register);

//* 進入login controller，處理登入資料
router.post('/login', authController.login);

//* 進入logout controller，執行登出
router.post('/logout', authController.logout);

//* 進入change_password controller
router.post('/change_password', authController.change_password);

//* 進入forget_password controller
router.post('/forget_password', authController.forget_password);

//* 進入reset_password controller
router.get('/reset_password', authController.reset_password);

//* 建立module並export，確保能導出建立好的router，提供給頁面
module.exports = router;