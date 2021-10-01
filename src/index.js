/*Script : Archivo principal de la aplicación 
*/
const express = require ('express');
const morgan = require('morgan');
const path = require('path');
const { database } = require('./keys');


// inicializations
const app = express();

// settings

app.set('port', process.env.PORT || 4000);

// Middelwares
app.use(morgan('dev'));
app.use(express.json());


// Routes
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/usuarios', require('./routes/user.routes'));
app.use('/api/documentos', require('./routes/documents.routes'));

// Static files
app.use(express.static(path.join(__dirname, '/public')));

// Starting Server
app.listen(app.get('port'),  () => {
    console.log('Server on Port', app.get('port'))
});