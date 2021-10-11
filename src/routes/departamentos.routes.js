
const express = require('express');
const router = express.Router();
const departamentoscontrollers= require('../controllers/departamentoscontrollers');


router.get('/', departamentoscontrollers.listdep);

router.get('/:id',departamentoscontrollers.getidepbyid) ;

//router.post('/', departamentoscontrollers.createdep);

router.put('/:id', departamentoscontrollers.editdep);

//router.delete('/:id', departamentoscontrollers.deletedep);





module.exports = router;