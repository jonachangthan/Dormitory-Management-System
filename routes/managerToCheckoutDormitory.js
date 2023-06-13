const managerToCheckoutDormitoryController = require('../controllers/managerToCheckoutDormitory');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.post('/action',token,managerToCheckoutDormitoryController.action);



module.exports = router;