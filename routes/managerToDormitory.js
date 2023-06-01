const managerToDormitoryController = require('../controllers/managerToDormitory');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.post('/action',token, managerToDormitoryController.action);



module.exports = router;