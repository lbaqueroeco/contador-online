const pool = require('../database');
const helpers = require('../lib/helpers');


const permisoscontrollers = {};

permisoscontrollers.listperm = async (req, res) => {
  const respuesta = await pool.query('SELECT p.idpermisos, p.per_crear, p.per_editar, p.per_eliminar, m.men_nombre, r.rol_nombre FROM permisos p INNER JOIN menus m ON p.per_menu=m.idmenus INNER JOIN roles r ON p.per_role =r.idroles');

  res.json(respuesta)

}

// permisos por id
permisoscontrollers.getipermyid = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT p.idpermisos, p.per_crear, p.per_editar, p.per_eliminar, m.men_nombre, r.rol_nombre FROM permisos p INNER JOIN menus m ON p.per_menu=m.idmenus INNER JOIN roles r ON p.per_role =r.idroles WHERE p.idpermisos =?', [id]);

  res.json(respuesta)


}

// permisos por rol
permisoscontrollers.getpermpr = async (req, res) => {
  const id  = req.params.id; 

  const respuesta = await pool.query('SELECT p.idpermisos, p.per_crear, p.per_editar, p.per_eliminar, m.men_nombre, r.rol_nombre FROM permisos p INNER JOIN menus m ON p.per_menu=m.idmenus INNER JOIN roles r ON p.per_role =r.idroles WHERE r.idroles =?', [id]);
console.log(respuesta)
  res.json(respuesta)


}

// permisos por menu
permisoscontrollers.getperpm = async (req, res) => {
  const id  = req.params.id; 
  const respuesta = await pool.query('SELECT p.idpermisos, p.per_crear, p.per_editar, p.per_eliminar, m.men_nombre, r.rol_nombre FROM permisos p INNER JOIN menus m ON p.per_menu=m.idmenus INNER JOIN roles r ON p.per_role =r.idroles WHERE m.idmenus=?', [id]);
console.log(respuesta)
  res.json(respuesta)


}

// permisos por usuario
permisoscontrollers.getperpus = async (req, res) => {
  const id  = req.params.id; 
  const respuesta = await pool.query('SELECT u.idusuarios, u.usu_nombre,  u.usu_usuario, r.rol_nombre, m.men_nombre, p.per_crear, p.per_editar, p.per_eliminar FROM usuarios u INNER JOIN roles r ON u.roles_idroles=r.idroles INNER JOIN permisos p ON r.idroles =p.per_role INNER JOIN menus m ON p.per_menu =m.idmenus  WHERE u.idusuarios=?', [id]);
console.log(respuesta)
  res.json(respuesta)


}


// usuarios que tengan permiso de crear en un menu

permisoscontrollers.getpercm = async (req, res) => {
  const id  = req.params.id; 
  const respuesta = await pool.query('SELECT u.idusuarios, u.usu_nombre,  u.usu_usuario, r.rol_nombre, m.men_nombre FROM usuarios u INNER JOIN roles r ON u.roles_idroles=r.idroles INNER JOIN permisos p ON r.idroles =p.per_role JOIN menus m ON p.per_menu =m.idmenus  WHERE m.idmenus=? AND p.per_crear="si"', [id]);
console.log(respuesta)
  res.json(respuesta)


}


// usuarios que tengan permiso de editar en un menu

permisoscontrollers.getperem = async (req, res) => {
  const id  = req.params.id; 
  const respuesta = await pool.query('SELECT u.idusuarios, u.usu_nombre,  u.usu_usuario, r.rol_nombre, m.men_nombre FROM usuarios u INNER JOIN roles r ON u.roles_idroles=r.idroles INNER JOIN permisos p ON r.idroles =p.per_role INNER JOIN menus m ON p.per_menu =m.idmenus  WHERE m.idmenus=? AND p.per_editar="si"', [id]);
console.log(respuesta)
  res.json(respuesta)


}



// usuarios que tengan permiso de eliminar en un menu

permisoscontrollers.getperelm= async (req, res) => {
  const id  = req.params.id; 
  const respuesta = await pool.query('SELECT u.idusuarios, u.usu_nombre,  u.usu_usuario, r.rol_nombre, m.men_nombre FROM usuarios u INNER JOIN roles r ON u.roles_idroles=r.idroles INNER JOIN permisos p ON r.idroles =p.per_role INNER JOIN menus m ON p.per_menu =m.idmenus  WHERE m.idmenus=? AND p.per_eliminar="si"', [id]);
console.log(respuesta)
  res.json(respuesta)


}

// depende del producto y categoria

permisoscontrollers.createperm = async (req, res) => {
  const { per_crear, per_editar, per_eliminar, per_menu, per_role } = req.body;
  const newperm = { per_crear, per_editar, per_eliminar, per_menu, per_role }
  const existemenu = await helpers.verifyexist('menus', 'idmenus', newperm.per_menu)
  const existerole = await helpers.verifyexist('roles', 'idroles', newperm.per_role)
  if (existemenu && existerole) {
    await pool.query('INSERT INTO permisos set?', [newperm]);

    res.json({ mensaje: 'permiso registrado' })

  } else {
    res.json({ mensaje: 'No se pudo crear el permiso ya que debe estar asociado a un rol y a un menu' })
  }
};

permisoscontrollers.editperm = async (req, res) => {
  const id = req.params.id;
  const { per_crear, per_editar, per_eliminar, per_menu, per_role } = req.body;
  const editeditem = { per_crear, per_editar, per_eliminar, per_menu, per_role }
  const existe = await helpers.verifyexist('permisos', 'idpermisos', id)
  const existerole = await helpers.verifyexist('roles', 'idroles', editeditem.per_role)
  const existemenu = await helpers.verifyexist('menus', 'idmenus', editeditem.per_menu)
  if (existe) {
    if (existerole) {
      if (existemenu) {
        await pool.query('UPDATE permisos set ? WHERE idpermisos=?', [editeditem, id]);
        res.json({ mensaje: 'permiso editado' })
      }
      else {
        res.json({ mensaje: 'el menu que quiere asignar a este permiso no existe' })
      }
    }
    else {
      res.json({ mensaje: 'el rol que quiere asignar a este permiso no existe' })
    }

  } else {
    res.json({ mensaje: 'el permiso que quiere editar no existe' })
  }
}

permisoscontrollers.deleteperm = async (req, res) => {
  const id = req.params.id;
  const existe = await helpers.verifyexist('permisos', 'idpermisos', id)
  if (existe) {

    await pool.query('DELETE FROM permisos  WHERE idpermisos =?', [id]);
    console.log(req.params.id)

    res.json({ mensaje: 'permiso eliminado' })
  } else {
    res.json({ mensaje: 'el permiso que quiere eliminar no existe' })
  }

}
module.exports = permisoscontrollers;