const studentToManagerController = require('../controllers/studentToManager');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();

//* 撰寫
router.post(null,token, studentToManagerController.action);



module.exports = router;