/*Script : verifica si el usuario existe o si el rol existe o es valido
(En constricción....)
*/

const keys = require('../keys');
const pool = require('../database');
const verifyregister = {};

// verifica que el token sea proveido y que sea valido
verifyregister.verifyrole = async (req,res, next) => {

   if (req.body.roles_idroles){

   }
};



module.exports = verifyregister;

