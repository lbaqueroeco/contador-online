/*Script : contiene todas las funciones que se ejecutan dentro de las 
rutas relacionadas con el manejo de los usuarios por parte 
de los roles autorizados (listar usuarios, borrar, buscar un usuario)
*/

const pool = require('../database');
const helpers = require('../lib/helpers');
const jwt = require('jsonwebtoken');
const keys = require('../keys');

const userscontrollers = {};

userscontrollers.listuser = async (req, res) => {
  const respuesta = await pool.query('SELECT u.idusuarios AS id, u.usu_nombre AS nombre, u.usu_email AS email, u.usu_usuario AS ususario, r.rol_nombre AS rol FROM usuarios u JOIN roles r ON u.roles_idroles = r.idroles');

  res.json(respuesta)

}

// listar ususarios por id
userscontrollers.getuserbyid = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT u.idusuarios AS id, u.usu_nombre AS nombre, u.usu_email AS email, u.usu_usuario AS ususario, r.rol_nombre AS rol FROM usuarios u JOIN roles r ON u.roles_idroles = r.idroles AND u.idusuarios=?', [id]);

  res.json(
    respuesta
  )


}
// listar ususarios por rol
userscontrollers.listuserpr = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT u.idusuarios, u.usu_nombre, u.usu_email, u.usu_usuario, r.rol_nombre FROM usuarios u JOIN roles r ON u.roles_idroles = r.idroles AND r.idroles=?', [id]);

  res.json(respuesta)


}


userscontrollers.edituser = async (req, res) => {


  const id = req.params.id;
  const { roles_idroles, usu_nombre, usu_email, usu_usuario, usu_password, usu_token } = req.body;
  const editeduser = { roles_idroles, usu_nombre, usu_email, usu_usuario, usu_password, usu_token };
  
  try{
    // comprobando si usuario existe
  const rows = await pool.query('SELECT roles_idroles,usu_nombre, usu_email, usu_usuario FROM usuarios WHERE idusuarios=?',[id] );
  if (rows.length > 0) {
    editeduser.usu_password = await helpers.encryptPassword(usu_password);

   
    if (editeduser.roles_idroles){

      try{
        
        const existe = await helpers.verifyexist('roles', 'idroles',editeduser.roles_idroles)

        if (existe)  {
          const result = await pool.query('UPDATE usuarios set ? WHERE idusuarios=?', [editeduser,id]);
          editeduser.id = result.insertId;
          const usertkn = {
            id:editeduser.id,
            rol:roles_idroles,
            nombre:usu_nombre
          }

          const token = jwt.sign(usertkn, keys.SECRET , {expiresIn: 86400})
          
          await pool.query('UPDATE  usuarios set usu_token=? WHERE idusuarios=?', [token, editeduser.id])
          res.json({token })
         
        }else{   

          res.json({mensaje: 'Rol no existente' })
        }
     
      }
      catch(error){
        console.log(error)
        
        res.json({mensaje: 'Edición no completada' })
      }
   
             
        
    }
    else{
      editeduser.roles_idroles = 1;
      const result = await pool.query('UPDATE usuarios set ? ', [editeduser]);
      editeduser.id = result.insertId;
      const token = jwt.sign({id:newuser.id}, keys.SECRET , {expiresIn: 86400})
      console.log(token)
      await pool.query('UPDATE  usuarios set usu_token=? WHERE idusuarios=?', [token, editeduser.id])
      res.json({token })

    }
    
  }else {
   
    res.json({mensaje: 'El usuario que quiere editar no existe' })
  };


  }
  catch(error){
    console.log(error)
    res.json({mensaje: 'campos no validos. No se pudo realizar la edición del usuario'})
  } 
}


userscontrollers.deleteuser = async (req, res) => {
  const id = req.params.id;
  const existed = await helpers.verifyexist('usuarios', 'idusuarios', id)
  if(existed){


  await pool.query('DELETE FROM usuarios  WHERE idusuarios =?', [id]);


  res.json({ mensaje: 'usuario eliminado' })
  }else{
    res.json({ mensaje: 'el usuario que desea eliminar no existe' })
  }


}



module.exports = userscontrollers;