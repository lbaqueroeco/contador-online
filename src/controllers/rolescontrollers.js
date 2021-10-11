const pool = require('../database');
const helpers = require('../lib/helpers');

const rolescontrollers = {};

rolescontrollers.listrole = async (req, res) => {
  const respuesta = await pool.query('SELECT idroles, rol_nombre FROM roles ');

  res.json(respuesta)

}

rolescontrollers.getrolebyid = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT idroles, rol_nombre FROM roles WHERE idroles=?', [id]);

  res.json(
    respuesta
  )


}

rolescontrollers.editrole = async (req, res) => {
  const id = req.params.id;
  const { rol_nombre } = req.body;
  const editedrol = { rol_nombre };
  const existe = await helpers.verifyexist('roles', 'idroles', id)
  if (existe) {

    await pool.query('UPDATE roles set ? WHERE idroles=?', [editedrol, id]);

    res.json({ mensaje: 'El rol ha sido actualizado' })
  } else {



    res.json({ mensaje: 'el rol que quiere editar no existe' })
  }



}

rolescontrollers.createrole = async (req, res) => {


  const { rol_nombre } = req.body;
  const newrol = { rol_nombre }
  const tablename = 'roles'
  const column = 'rol_nombre'
  const item = newrol.rol_nombre
  const existe = await helpers.verifyexist(tablename, column, item)


  if (existe) {

    res.json({ mensaje: 'rol ya existe' })
  }
  else {
    await pool.query('INSERT INTO roles set?', [newrol]);

    res.json({ mensaje: 'rol registrado' })
  }
}



rolescontrollers.deleterole = async (req, res) => {
  const id = req.params.id;
  const existe = await helpers.verifyexist('roles', 'idroles', id)

  if (existe) {
    // await pool.query('DELETE  u, r, p FROM usuarios u INNER JOIN roles r ON u.roles_idroles = r.idroles INNER JOIN permisos p WHERE r.idroles = p.per_role   AND r.idroles=?', [id]);
    await pool.query('DELETE FROM permisos  WHERE per_role =?', [id]);
    await pool.query('DELETE FROM usuarios  WHERE roles_idroles =?', [id]);
    await pool.query('DELETE FROM roles  WHERE idroles =?', [id]);


    res.json({ mensaje: 'rol eliminado' })
  } else {

    res.json({ mensaje: 'el rol no existe' })
  }
}
module.exports = rolescontrollers;
