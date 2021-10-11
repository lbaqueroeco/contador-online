/*Script : funciones generales para la aplicación
*/
const bcrypt = require('bcryptjs');
const pool = require('../database');


const helpers = {};


helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

helpers.encryptdocs = async (docinfo) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(docinfo, salt);
  return hash;
};

helpers.verifyexist= async(tablename, column, item) =>{
  

  const rows = await pool.query('SELECT * FROM ?? WHERE ??=?',[tablename, column,item] );
  if (rows.length > 0) {
    return true
  }else {
    false
  }

  

}




module.exports = helpers;