const express = require('express');
const router = express.Router();

const clientescotrollers= require('../controllers/clientescotrollers');


router.get('/', clientescotrollers.listcli);

router.get('/:id',clientescotrollers.geticlimyid) ;

// listar clientes por ciudad
router.get('/ciudad/:id',clientescotrollers.geticlibyc) ;

// listar clientes por departamento
router.get('/departamento/:id',clientescotrollers.geticlibyd) ;

router.post('/', clientescotrollers.createcli);

router.put('/:id', clientescotrollers.editcli);

//router.delete('/:id', clientescotrollers.deletecli);





module.exports = router;