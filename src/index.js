/*Script : Archivo principal de la aplicación 
*/
const express = require ('express');
const { graphqlHTTP } = require('express-graphql');
const morgan = require('morgan');
const path = require('path');
const { database } = require('./keys');


// inicializations
const app = express();
const schema = {}
app.use('/graphql', graphqlHTTP({
    graphiql:true,
    schema: schema

}))

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
app.use('/api/roles', require('./routes/role.routes'));
app.use('/api/inventarios', require('./routes/inventarios.routes'));
app.use('/api/nomina', require('./routes/nomina.routes'));
app.use('/api/categorias', require('./routes/categorias.routes'));
app.use('/api/tiposproductos', require('./routes/tiposprod.routes'));
app.use('/api/menus', require('./routes/menus.routes'));
app.use('/api/permisos', require('./routes/permisos.routes'));
app.use('/api/departamentos', require('./routes/departamentos.routes'));
app.use('/api/tiposterceros', require('./routes/tiposterceros.routes'));
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/terceros', require('./routes/terceros.routes'));
app.use('/api/ciudades', require('./routes/ciudades.routes'));
app.use('/api/logtransactions', require('./routes/logtransations.routes'));
app.use('/api/categoriaspuc', require('./routes/cetegoriaspuc.routes'));
app.use('/api/tipostransacciones', require('./routes/tipostransacciones.routes'));
app.use('/api/puc', require('./routes/puc.routes'));
app.use('/api/transacciones', require('./routes/transacciones.routes'));
app.use('/api/liqnomina', require('./routes/liqnomina.routes'));


// Static files
app.use(express.static(path.join(__dirname, '/public')));

// Starting Server
app.listen(app.get('port'),  () => {
    console.log('Server on Port', app.get('port'))
});