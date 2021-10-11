const express = require('express');
const router = express.Router();
const categiruaspuccotrollers= require('../controllers/categiruaspuccotrollers');


router.get('/', categiruaspuccotrollers.listcatpuc);

router.get('/:id',categiruaspuccotrollers.geticatbyidpuc) ;

router.post('/', categiruaspuccotrollers.createcatpuc);

router.put('/:id', categiruaspuccotrollers.editcatpuc);

//router.delete('/:id', categiruaspuccotrollers.deletcat);





module.exports = router;