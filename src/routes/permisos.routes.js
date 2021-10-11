const express = require('express');
const router = express.Router();

const permisoscontrollers= require('../controllers/permisoscontrollers');


router.get('/', permisoscontrollers.listperm);

// pemisos por id
router.get('/:id',permisoscontrollers.getipermyid) ;

// pemisos por rol
router.get('/rol/:id',permisoscontrollers.getpermpr) ;

// pemisos por menu
router.get('/menus/:id',permisoscontrollers.getperpm) ;

// pemisos por usuario
router.get('/usuario/:id',permisoscontrollers.getperpus) ;

// listar usuarios que tengan permiso para crear en un menu
router.get('/usuarios/crear/:id',permisoscontrollers.getpercm) ;

// listar usuarios que tengan permiso para editar en un menu
router.get('/usuarios/editar/:id',permisoscontrollers.getperem) ;

// listar usuarios que tengan permiso para eliminar en un menu
router.get('/usuarios/eliminar/:id',permisoscontrollers.getperelm) ;

router.post('/', permisoscontrollers.createperm);

router.put('/:id', permisoscontrollers.editperm);

router.delete('/:id', permisoscontrollers.deleteperm);





module.exports = router;