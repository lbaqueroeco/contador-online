const express = require('express');
const router = express.Router();

const nominacontrollers= require('../controllers/nominacontrollers');


router.get('/', nominacontrollers.listitem);

router.get('/:id',nominacontrollers.getitembyid) ;

// listar nomina por cliente

router.get('/cliente/:id',nominacontrollers.getitembycli) ;

router.post('/', nominacontrollers.createitem);

router.put('/:id', nominacontrollers.edititem);

//router.delete('/:id', nominacontrollers.deleteitem);





module.exports = router;