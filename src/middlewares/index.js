/*Script : contiene todos los middlewares creados en un solo paquete
*/
const auth = require('./auth')

const verifyregister = require('./verifyregister')
const documents = require('./documents')

module.exports = {auth, verifyregister, documents};