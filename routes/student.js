const studentController = require('../controllers/student');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.get('/',token, studentController.action);

router.post('/action',token, studentController.action);

module.exports = router;