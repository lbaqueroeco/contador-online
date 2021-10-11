
const express = require('express');
const router = express.Router();
const tiposterceroscontrollers= require('../controllers/tiposterceroscontrollers');


router.get('/', tiposterceroscontrollers.listtter);

router.get('/:id',tiposterceroscontrollers.getitterbyid) ;

router.post('/', tiposterceroscontrollers.creattter);

router.put('/:id', tiposterceroscontrollers.edittter);

//router.delete('/:id', tiposterceroscontrollers.delettter);





module.exports = router;