const supervisorToDormitoryController = require('../controllers/supervisorToDormitory');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.post('/action',token, supervisorToDormitoryController.action);



module.exports = router;