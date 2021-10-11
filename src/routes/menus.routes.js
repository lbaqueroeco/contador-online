const express = require('express');
const router = express.Router();

const menuscontrollers= require('../controllers/menuscontrollers');


router.get('/', menuscontrollers.listmenus);

router.get('/:id',menuscontrollers.getmenubyid) ;

// menu por rol
router.get('/rol/:id',menuscontrollers.getmenupr) ;

router.post('/', menuscontrollers.createmenu);

router.put('/:id', menuscontrollers.editmenu);

router.delete('/:id', menuscontrollers.deletemenu);





module.exports = router;