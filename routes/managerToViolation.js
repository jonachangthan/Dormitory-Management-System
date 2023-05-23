const managerToViolationController = require('../controllers/managerToViolation');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.post('/action',token, managerToViolationController.action);



module.exports = router;