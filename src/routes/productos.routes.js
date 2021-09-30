/*Script : rutas de productos
*/
const express = require('express');
const router = express.Router();
const pool = require('../database');
const productoscontrolers= require('../controllers/productoscontrolers');


router.get('/', productoscontrolers.listproduct);

router.get('/:id',productoscontrolers.getprodbyid ) ;

router.post('/', productoscontrolers.createproduct);

router.put('/:id', productoscontrolers.editproduct );

router.delete('/:id', productoscontrolers.deleteproduct);





module.exports = router;