const modifyAccountController = require('../controllers/modifyAccount');
const token = require("../controllers/token.js");
const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
//* 撰寫
router.post('/search', token, modifyAccountController.search);

router.post('/addStudent', token, modifyAccountController.addStudent);

router.post('/addManager', token, modifyAccountController.addManager);

router.post('/addSupervisor', token, modifyAccountController.addSupervisor);

router.post('/delete', token, modifyAccountController.delete);

module.exports = router;