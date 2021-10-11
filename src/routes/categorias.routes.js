const express = require('express');
const router = express.Router();
const categoriascontrollers= require('../controllers/categoriascontrollers');


router.get('/', categoriascontrollers.listcat);

router.get('/:id',categoriascontrollers.geticatbyid) ;

router.post('/', categoriascontrollers.createcat);

router.put('/:id', categoriascontrollers.editcat);

//router.delete('/:id', categoriascontrollers.deletcat);





module.exports = router;