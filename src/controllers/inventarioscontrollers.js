const pool = require('../database');
const helpers = require('../lib/helpers');


const inventarioscontrollers = {};

inventarioscontrollers.listitem = async (req, res) => {
  const respuesta = await pool.query('SELECT i.idinventarios, p.pro_nombre, i.inv_cantidad, i.inv_ingreso, i.inv_egreso FROM inventarios i INNER JOIN productos p ON I.inv_proiducto=p.idproductos');

  res.json(respuesta)

}
inventarioscontrollers.getitembyid = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT i.idinventarios, p.pro_nombre, i.inv_cantidad, i.inv_ingreso, i.inv_egreso FROM inventarios i INNER JOIN productos p ON I.inv_proiducto=p.idproductos  WHERE i.idinventarios =?', [id]);

  res.json(respuesta)


}

// listar inventario por producto


inventarioscontrollers.getitembyprod = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT i.idinventarios, p.pro_nombre, i.inv_cantidad, i.inv_ingreso, i.inv_egreso FROM inventarios i INNER JOIN productos p ON I.inv_proiducto=p.idproductos  WHERE p.idproductos=?', [id]);

  res.json(respuesta)


}

// listar inventario por tipo de producto

inventarioscontrollers.getitembytp = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT i.idinventarios, p.pro_nombre, i.inv_cantidad, i.inv_ingreso, i.inv_egreso FROM inventarios i INNER JOIN productos p ON i.inv_proiducto=p.idproductos INNER JOIN tiposproducto tp ON tp.idtiposproducto=p.pro_tipo  WHERE tp.idtiposproducto=?', [id]);

  res.json(respuesta)


}

// listar inventario por categoria


inventarioscontrollers.getitembycat = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT i.idinventarios, p.pro_nombre, i.inv_cantidad, i.inv_ingreso, i.inv_egreso FROM inventarios i INNER JOIN productos p ON i.inv_proiducto=p.idproductos INNER JOIN categoria cat ON cat.idcategorias=p.pro_categoria  WHERE cat.idcategorias=?', [id]);

  res.json(respuesta)


}

// listar inventario por tercerp

inventarioscontrollers.getitembyter = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT i.idinventarios, p.pro_nombre, i.inv_cantidad, i.inv_ingreso, i.inv_egreso FROM inventarios i INNER JOIN productos p ON i.inv_proiducto=p.idproductos INNER JOIN terceros ter ON ter.idterceros=p.pro_terceros  WHERE ter.idterceros=?', [id]);

  res.json(respuesta)


}

// depende del producto y categoria

inventarioscontrollers.createitem = async (req, res) => {

  const { inv_proiducto, inv_cantidad, inv_ingreso, inv_egreso } = req.body;
  const newitem = { inv_proiducto, inv_cantidad, inv_ingreso, inv_egreso }
  const existei = await helpers.verifyexist('inventarios', 'idinventarios', newitem.inv_proiducto)
  if(!existei){
    const existep = await helpers.verifyexist('productos', 'idproductos', newitem.inv_proiducto)
    if(existep){
      await pool.query('INSERT INTO inventarios set?', [newitem]);
      res.json({ mensaje: 'guarado en inventario' })
    }else{
      res.json({ mensaje: 'debe crear un producto para poder guardarlo en inventario' })
    }

   
  }
  else{

  res.json({ mensaje: 'el producto ya existe en inventario' })
  }

}



inventarioscontrollers.edititem = async (req, res) => {
  const id = req.params.id;
  const { inv_proiducto, inv_cantidad, inv_ingreso, inv_egreso } = req.body;
  const editeditem = { inv_proiducto, inv_cantidad, inv_ingreso, inv_egreso }
  const existee = await helpers.verifyexist('inventarios', 'idinventarios', id)
  if(existee){
    const existeep = await helpers.verifyexist('productos', 'idproductos', inv_proiducto)
    if(existeep){
      await pool.query('UPDATE inventarios set ? WHERE idinventarios =?', [editeditem, id]);

  res.json({ mensaje: 'item editado en el inventario' })

    }else{
      res.json({ mensaje: 'el item que quiere editar no existe en productos. Cree un producto para poder editar' })
    }

  
  }else{
    res.json({ mensaje: 'item que quiere editar no existe en el inventario' })
  }
  
}

inventarioscontrollers.deleteitem = async (req, res) => {
  const id = req.params.id;
  const existed = await helpers.verifyexist('inventarios', 'idinventarios', id)
  if(existed){


  await pool.query('DELETE FROM inventarios  WHERE idinventarios =?', [id]);


  res.json({ mensaje: 'item eliminado' })
  }else{
    res.json({ mensaje: 'el item que desea eliminar no existe en el inventario' })
  }


}
module.exports = inventarioscontrollers;