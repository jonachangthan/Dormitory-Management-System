const supervisorToStudentAccommodationController = require('../controllers/supervisorToStudentAccommodation');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.post('/action',token,supervisorToStudentAccommodationController.action);



module.exports = router;