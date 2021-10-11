const express = require('express');
const router = express.Router();
const tiposprodcontrollers= require('../controllers/tiposprodcontrollers');


router.get('/', tiposprodcontrollers.listtipprod);

router.get('/:id',tiposprodcontrollers.getitprodbyid) ;

router.post('/', tiposprodcontrollers.createtprod );

router.put('/:id', tiposprodcontrollers.edittpod);

//router.delete('/:id', tiposprodcontrollers.delettpord);





module.exports = router;