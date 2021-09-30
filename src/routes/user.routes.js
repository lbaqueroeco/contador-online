/*Script : rutas para funciones de administracion de usuarios
*/
const express = require('express');
const router = express.Router();
const pool = require('../database');
const userscontrollers= require('../controllers/userscontrollers');
const authcontroller= require('../controllers/authcontroller');
const {auth} = require('../middlewares/index');
const {verifyregister} = require('../middlewares/index');

router.get('/', auth.verifytoken, auth.isAdmin, userscontrollers.listuser);

router.get('/:id',auth.verifytoken, auth.isAdmin, userscontrollers.getuserbyid ) ;

router.post('/', authcontroller.registro);

router.put('/:id', userscontrollers.edituser );

router.delete('/:id', auth.verifytoken, auth.isAdmin, userscontrollers.deleteuser);





module.exports = router;