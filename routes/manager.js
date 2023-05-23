const managerController = require('../controllers/manager');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.get('/',token, managerController.action);

router.post('/action',token, managerController.action);

module.exports = router;