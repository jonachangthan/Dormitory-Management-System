const managerToEquipmentController = require('../controllers/managerToEquipment');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.post('/action',token, managerToEquipmentController.action);



module.exports = router;