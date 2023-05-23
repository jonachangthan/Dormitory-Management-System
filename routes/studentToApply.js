const studentToApply = require('../controllers/studentToApply');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.post('/apply',token, studentToApply.apply);
router.post('/delete',token, studentToApply.delete);


module.exports = router;