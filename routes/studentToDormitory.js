const studentToDormitoryController = require('../controllers/studentToDormitory');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.post('/action',token, studentToDormitoryController.action);



module.exports = router;