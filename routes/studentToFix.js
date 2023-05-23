const studentToFix = require('../controllers/studentToFix');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.post('/action',token, studentToFix.action);


module.exports = router;