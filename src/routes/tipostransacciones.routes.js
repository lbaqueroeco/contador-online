const express = require('express');
const router = express.Router();
const tipostransaccionescontrolles= require('../controllers/tipostransaccionescontrolles');


router.get('/', tipostransaccionescontrolles.listtt);

router.get('/:id',tipostransaccionescontrolles.getittbyid) ;

router.post('/', tipostransaccionescontrolles.creatett);

router.put('/:id', tipostransaccionescontrolles.edittt);

//router.delete('/:id', tipostransaccionescontrolles.deletcat);





module.exports = router;