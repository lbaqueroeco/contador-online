const express = require('express');
const router = express.Router();

const inventarioscontrollers= require('../controllers/inventarioscontrollers');


router.get('/', inventarioscontrollers.listitem);

router.get('/:id',inventarioscontrollers.getitembyid) ;

// listar inventario por producto

router.get('/producto/:id',inventarioscontrollers.getitembyprod) ;


// listar inventario por tipo de producto

router.get('/producto/tipo/:id',inventarioscontrollers.getitembytp) ;

// listar inventario por categoria de producto

router.get('/producto/categoria/:id',inventarioscontrollers.getitembycat) ;

// listar inventario por terceros

router.get('/producto/tercero/:id',inventarioscontrollers.getitembyter) ;


router.post('/', inventarioscontrollers.createitem);

router.put('/:id', inventarioscontrollers.edititem);

router.delete('/:id', inventarioscontrollers.deleteitem);





module.exports = router;