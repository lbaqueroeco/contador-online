/*Script : Middleware para verificar si el usuario intodujo un token
y los permisos de acceso a las rutas segun el rol de usuario (En construcción....)
*/
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const pool = require('../database');
const auth = {};

// verifica que el token sea proveido y que sea valido
auth.verifytoken = async (req,res, next) => {

    try{
        const token = req.headers["x-access-token"]
    if(!token){
        res.json({mensaje : 'No se ha registrado un token' })
    }else{
        const decoded = jwt.verify(token, keys.SECRET)
         req.userid = decoded.id
       
        const rows = await pool.query('SELECT *  FROM usuarios WHERE idusuarios=?', req.userid);
        if (rows.length > 0) {
            next()
         
        } else {
          res.json({mensaje: 'El usuario no existe, intente de nuevo o regístrese en la app'});
         
        };

    }
    } catch(error){
        res.json({mensaje:'acceso no autorizado'})
    }
   
    
};

// verifica que el token sea proveido y que sea valido para un rol de usuario específico

auth.isAdmin = async(req, res, next) =>{

    const rows = await pool.query('SELECT *  FROM usuarios WHERE idusuarios=?', req.userid );
    //const rol = await pool.query('SELECT *  FROM roles WHERE idroles=?', rows[0].roles_idroles );
 
    if(rows[0].roles_idroles == 3){
        next()
    } else{
        res.json({mensaje: 'se requiere rol de administrador para ejecutar esta funcion'})
    } 

}


auth.isContador = async(req, res, next) =>{

    const rows = await pool.query('SELECT *  FROM usuarios WHERE idusuarios=?', req.userid );
    //const rol = await pool.query('SELECT *  FROM roles WHERE idroles=?', rows[0].roles_idroles );
   
    if(rows[0].roles_idroles == 2){
        next()
    } else{
        res.json({mensaje: 'se requiere rol de contador para ejecutar esta funcion'})
    } 

}

auth.isClient = async(req, res, next) =>{

    const rows = await pool.query('SELECT *  FROM usuarios WHERE idusuarios=?', req.userid );
  //  const rol = await pool.query('SELECT *  FROM roles WHERE idroles=?', rows[0].roles_idroles );
 
    if(rows[0].roles_idroles == 1){
        next()
    } else{
        res.json({mensaje: 'se requiere rol de cliente para ejecutar esta funcion'})
    } 

}

module.exports = auth;