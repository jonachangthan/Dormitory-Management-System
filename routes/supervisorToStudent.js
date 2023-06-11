const supervisorToStudentController = require('../controllers/supervisorToStudent');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.post('/search',token, supervisorToStudentController.search);

module.exports = router;