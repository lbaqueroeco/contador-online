const express = require('express');
const router = express.Router();
const pool = require('../database');
const userscontrollers= require('../controllers/userscontrollers');
const authcontroller= require('../controllers/authcontroller');
const {auth} = require('../middlewares/index');
const {verifyregister} = require('../middlewares/index');
const {documents} = require('../middlewares/index');
const documentscontrollers= require('../controllers/documentscontrollers');




router.post('/subir', documents.storagesingle, documentscontrollers.upload);





module.exports = router;