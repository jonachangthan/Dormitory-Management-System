const managerToApplyController = require('../controllers/managerToApply');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.post('/action',token, managerToApplyController.action);



module.exports = router;