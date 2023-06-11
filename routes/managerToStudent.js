const managerToStudentController = require('../controllers/managerToStudent');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.post('/search',token, managerToStudentController.search);

router.post('/modify',token, managerToStudentController.modify);

module.exports = router;