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
    const rol = await pool.query('SELECT *  FROM roles WHERE idroles=?', rows[0].roles_idroles );
    console.log(rol[0].rol_nombre)
    if(rol[0].rol_nombre == 'administrador'){
        next()
    } else{
        res.json({mensaje: 'se requiere rol de administrador para ejecutar esta funcion'})
    } 

}
auth.isClient = async(req, res, next) =>{

    const rows = await pool.query('SELECT *  FROM usuarios WHERE idusuarios=?', req.userid );
    const rol = await pool.query('SELECT *  FROM roles WHERE idroles=?', rows[0].roles_idroles );
    console.log(rol[0].rol_nombre)
    if(rol[0].rol_nombre == 'cliente'){
        next()
    } else{
        res.json({mensaje: 'se requiere rol de cliente para ejecutar esta funcion'})
    } 

}

module.exports = auth;