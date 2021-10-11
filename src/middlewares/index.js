/*Script : contiene todos los middlewares creados en un solo paquete
*/
const auth = require('./auth')


const documents = require('./documents')

module.exports = {auth,  documents};