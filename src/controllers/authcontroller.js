
/*Script : contiene todas las funciones que se ejecutan dentro de las 
rutas relacionadas con la autenticación de usuarios (login, registo)
*/
const pool = require('../database');
const helpers = require('../lib/helpers');
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const authcontroller = {};

authcontroller.login = async (req,res) => {
  const {usu_email, usu_password} =req.body;
  const user =  {usu_email, usu_password}

  // comprobando si usuario existe  
  const rows = await pool.query('SELECT * FROM usuarios WHERE usu_email=?',[user.usu_email] );
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(usu_password, user.usu_password)
    if (validPassword) {
      const usertkn = {
        id:user.id,
        rol:user.roles_idroles,
        nombre:user.usu_nombre
      }
      const token = jwt.sign(usertkn, keys.SECRET , {expiresIn: 86400})
      await pool.query('UPDATE  usuarios set usu_token=? WHERE idusuarios=?', [token, rows[0].id])
     res.json({token});
    } else {
      res.json({'mensaje': 'password incorrecto'});
    }
  } else {
    res.json({'mensaje': 'El usuario no existe, intente de nuevo o regístrese en la app'});
   
  };
 
  
  };

  authcontroller.registro = async (req,res) => {

    // requiriendo datos del registro de usuario
    const {roles_idroles,usu_nombre, usu_email, usu_usuario, usu_password} =req.body;
    const newuser =  {roles_idroles,usu_nombre, usu_email, usu_usuario, usu_password}

    try{
      // comprobando si usuario existe
    const rows = await pool.query('SELECT roles_idroles,usu_nombre, usu_email, usu_usuario FROM usuarios WHERE usu_email=?',[newuser.usu_email] );
    if (rows.length > 0) {
      res.json({mensaje: 'El usuario ya existe' })
    }else {
      newuser.usu_password = await helpers.encryptPassword(usu_password);

      // verifica que se este enviando un rol en el registro, por defecto es cliente
      if (newuser.roles_idroles){

        try{
          
          const existe = await helpers.verifyexist('roles', 'idroles',newuser.roles_idroles)

          if (existe)  {
            const result = await pool.query('INSERT INTO usuarios set ? ', [newuser]);
            newuser.id = result.insertId;
            const usertkn = {
              id:newuser.id,
              rol:roles_idroles,
              nombre:usu_nombre
            }

            const token = jwt.sign(usertkn, keys.SECRET , {expiresIn: 86400})
            console.log(token)
            await pool.query('UPDATE  usuarios set usu_token=? WHERE idusuarios=?', [token, newuser.id])
            res.json({token })
           
          }else{   

            res.json({mensaje: 'Rol no existente' })
          }
       
        }
        catch(error){
          console.log(error)
          
          res.json({mensaje: 'Registro no completado' })
        }
     
               
          
      }
      else{
        newuser.roles_idroles = 1;
        const result = await pool.query('INSERT INTO usuarios set ? ', [newuser]);
        newuser.id = result.insertId;
        const token = jwt.sign({id:newuser.id}, keys.SECRET , {expiresIn: 86400})
        console.log(token)
        await pool.query('UPDATE  usuarios set usu_token=? WHERE idusuarios=?', [token, newuser.id])
        res.json({token })

      }
     
    };


    }
    catch(error){
      console.log(error)
      res.json({mensaje: 'campos no validos. No se pudo realizar el registro'})
    } 
    
  
  };


module.exports = authcontroller;