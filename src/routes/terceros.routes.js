const express = require('express');
const router = express.Router();

const terceroscontrollers= require('../controllers/terceroscontrollers');


router.get('/', terceroscontrollers.listter);

router.get('/:id',terceroscontrollers.getitermyid) ;

//listar terceros por tipo
router.get('/tipo/:id',terceroscontrollers.getbytipo) ;

//listar terceros por ciudad
router.get('/ciudad/:id',terceroscontrollers.getbyciudad) ;

//listar terceros por ciudad que sean compradores
router.get('/ciudad/comprador/:id',terceroscontrollers.getbyciudadcom) ;

//listar terceros por ciudad que sean vendedores
router.get('/ciudad/vendedor/:id',terceroscontrollers.getbyciudadven) ;

//listar terceros por ciudad que sean mixtos
router.get('/ciudad/mixto/:id',terceroscontrollers.getbyciudadmix) ;

//listar terceros por departamento
router.get('/departamento/:id',terceroscontrollers.getbydpto) ;

//listar terceros por departamento que sean compradores
router.get('/departamento/comprador/:id',terceroscontrollers.getbydptocom) ;

//listar terceros por departamento que sean compradores
router.get('/departamento/vendedor/:id',terceroscontrollers.getbydptoven) ;

//listar terceros por departamento que sean compradores
router.get('/departamento/mixto/:id',terceroscontrollers.getbydptomix) ;



router.post('/', terceroscontrollers.createter);

router.put('/:id', terceroscontrollers.editter);

//router.delete('/:id', terceroscontrollers.deleteter);





module.exports = router;