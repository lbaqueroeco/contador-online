/*Script : contiene todas las funciones que se ejecutan dentro de las 
rutas relacionadas con el manejo de los usuarios por parte 
de los roles autorizados (listar usuarios, borrar, buscar un usuario)
*/

const pool = require('../database');

const userscontrollers = {};

userscontrollers.listuser = async (req,res) => {
  const respuesta = await pool.query('SELECT * FROM usuarios ');
   
  res.json(respuesta)

}

userscontrollers.getuserbyid = async (req,res) => {
  const id  = req.params.id;
  const respuesta = await pool.query('SELECT * FROM usuarios WHERE id=?',[id]);
 
res.json({
  respuesta
})

  
}


userscontrollers.edituser = async (req,res) => {
  

    res.json({status: 'Producto editado'})

  
}

userscontrollers.deleteuser = async (req,res) => {
    
    const id  = req.params.id;
   
   await pool.query('DELETE FROM usuarios  WHERE idusuarios=?', [id]);
    console.log(req.params.id)


    res.json({status: 'usuario eliminado'})

  
}
module.exports = userscontrollers;