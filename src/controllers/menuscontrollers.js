
const pool = require('../database');
const helpers = require('../lib/helpers');
const menuscontrollers = {};

menuscontrollers.listmenus = async (req,res) => {
  const respuesta = await pool.query('SELECT idmenus, men_nombre, men_url, men_orden, men_categoria FROM menus ');
   
  res.json(respuesta)

}

menuscontrollers.getmenubyid = async (req,res) => {
  const id  = req.params.id;
  const respuesta = await pool.query('SELECT idmenus, men_nombre, men_url, men_orden, men_categoria FROM menus WHERE idmenus=?',[id]);
 
res.json({
  respuesta
})

}

/// menus por rol
menuscontrollers.getmenupr = async (req,res) => {
  const id  = req.params.id; 
 
  const respuesta = await pool.query('SELECT idmenus, m.men_nombre, m.men_url, m.men_orden, m.men_categoria, r.rol_nombre FROM menus m INNER JOIN permisos p ON m.idmenus=p.per_menu INNER JOIN roles r ON p.per_role = r.idroles WHERE r.idroles=?',[id]);
 
res.json(respuesta)

}



menuscontrollers.editmenu = async (req,res) => {
  const id  = req.params.id;
  const {men_nombre, men_url, men_orden,men_categoria} =req.body;
  const editmenu= {men_nombre, men_url, men_orden,men_categoria};
  const tablename = 'menus'
  const column = 'idmenus'
  const item = id
  const existe = await helpers.verifyexist(tablename, column, item)
  if(existe){
  
  await pool.query('UPDATE menus set ? WHERE idmenus=?', [editmenu, id]);
  
    
    res.json({mensaje:'El menú ha sido actualizado'})
  }else{


    
    res.json({mensaje:'el menu no existe'})
  }

  

  }

  menuscontrollers.createmenu = async (req,res) => {
    const {men_nombre, men_url, men_orden,men_categoria} =req.body;
    const newmenu= {men_nombre, men_url, men_orden,men_categoria};
    const tablename = 'menus';
    const column = 'men_nombre';
    const item = newmenu.men_nombre;
    const existe = await helpers.verifyexist(tablename, column, item);
   

    if (existe){

      res.json({mensaje: 'el menú ya existe'})
    }
    else{
      await pool.query('INSERT INTO menus set?', [newmenu]);

    res.json({mensaje: 'menú registrado'})
    }    
}


menuscontrollers.deletemenu = async (req,res) => {
  const id  = req.params.id;
  const tablename = 'menus'
          const column = 'idmenus'
          const item = id
          const existe = await helpers.verifyexist(tablename, column, item)

    if(existe){
     // await pool.query('DELETE  u, r, p FROM usuarios u INNER JOIN roles r ON u.roles_idroles = r.idroles INNER JOIN permisos p WHERE r.idroles = p.per_role   AND r.idroles=?', [id]);
     await pool.query('DELETE FROM permisos  WHERE per_menu =?', [id]);
     await pool.query('DELETE FROM menus WHERE idmenus=?', [id]);
      
  res.json({mensaje:'menu eliminado'})
}else{

  res.json({mensaje:'el menu no existe'})
}
}

module.exports = menuscontrollers;
