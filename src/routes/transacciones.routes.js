
const express = require('express');
const router = express.Router();

const transaccionescontrollers= require('../controllers/transaccionescontrollers');


router.get('/', transaccionescontrollers.listitem);

router.get('/:id',transaccionescontrollers.getitembyid) ;

router.post('/', transaccionescontrollers.createitem);

router.put('/:id', transaccionescontrollers.edititem);

router.delete('/:id', transaccionescontrollers.deleteitem);


module.exports = router;
