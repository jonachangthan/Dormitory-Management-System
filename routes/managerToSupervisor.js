const managerToSupervisorController = require('../controllers/managerToSupervisor');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫

router.post('/modify',token, managerToSupervisorController.modify);

module.exports = router;