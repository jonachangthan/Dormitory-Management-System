const studentToApply = require('../controllers/studentToApply');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();

router.get('/', token, studentToApply.get);

router.get('/bill', token, studentToApply.bill);

router.post('/apply', token, studentToApply.apply);

router.post('/delete', token, studentToApply.delete);

module.exports = router;