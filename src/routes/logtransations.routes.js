const express = require('express');
const router = express.Router();

const logtranscontrollers= require('../controllers/logtranscontrollers');


router.get('/', logtranscontrollers.listlog);

router.get('/:id',logtranscontrollers.getlogbyid) ;

router.post('/', logtranscontrollers.createlog);

router.put('/:id', logtranscontrollers.editlog);

router.delete('/:id', logtranscontrollers.deletelog);


module.exports = router;