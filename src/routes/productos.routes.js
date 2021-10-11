/*Script : rutas de productos
*/
const express = require('express');
const router = express.Router();
const pool = require('../database');
const productoscontrolers= require('../controllers/productoscontrolers');


router.get('/', productoscontrolers.listproduct);

// listar productos por id
router.get('/:id',productoscontrolers.getprodbyid ) ;

// listar productos por categoria
router.get('/categoria/:id',productoscontrolers.getprodbycat ) ;

// listar productos por tipo
router.get('/tipo/:id',productoscontrolers.getprodbytipo ) ;

// listar productos por terceros
router.get('/tercero/:id',productoscontrolers.getprodbyter ) ;

// listar productos por ciudad de los terceros
router.get('/ciudadter/:id',productoscontrolers.getprodbyciuter ) ;

// listar productos por departamento de los terceros
router.get('/departamentoter/:id',productoscontrolers.getprodbydepter ) ;

// listar productos por ciudad de x categoria
router.get('/ciudad/:ciucat',productoscontrolers.getprodbyciucat ) ;

router.post('/', productoscontrolers.createproduct);

router.put('/:id', productoscontrolers.editproduct );

router.delete('/:id', productoscontrolers.deleteproduct);





module.exports = router;