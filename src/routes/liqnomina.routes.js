
const express = require('express');
const router = express.Router();

const liquidacionnominacontrollers= require('../controllers/liquidacionnominacontrollers');


router.get('/', liquidacionnominacontrollers.listitem);

router.get('/:id',liquidacionnominacontrollers.getitembyid) ;

router.post('/', liquidacionnominacontrollers.createitem);

router.put('/:id', liquidacionnominacontrollers.edititem);

router.delete('/:id', liquidacionnominacontrollers.deleteitem);
module.exports = router;