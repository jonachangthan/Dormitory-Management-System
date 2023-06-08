const supervisorController = require('../controllers/supervisor');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.get('/',token, supervisorController.action);

router.post('/action',token, supervisorController.action);

module.exports = router;