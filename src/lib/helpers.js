const bcrypt = require('bcryptjs');


const helpers = {};

/*Script : funciones generales para la aplicación
*/
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



module.exports = helpers;