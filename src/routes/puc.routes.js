const express = require('express');
const router = express.Router();

const puccontrollers= require('../controllers/puccontrollers');


router.get('/', puccontrollers.listitem);

router.get('/:id',puccontrollers.getitembyid) ;

// listar puc por categoria
router.get('/categoria/:id',puccontrollers.getitembycat) ;

// listar puc por cliente
router.get('/cliente/:id',puccontrollers.getitembycli) ;

router.post('/', puccontrollers.createitem);

router.put('/:id', puccontrollers.edititem);

//router.delete('/:id', puccontrollers.deleteitem);


module.exports = router;