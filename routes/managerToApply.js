const managerToApplyController = require('../controllers/managerToApply');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.post('/action',token, managerToApplyController.action);

router.post('/pay',token, managerToApplyController.pay);

router.post('/informAll', token, managerToApplyController.informAll);

module.exports = router;