
const pool = require('../database');
const helpers = require('../lib/helpers');

const puccontrollers = {};

puccontrollers.listitem = async (req, res) => {
  const respuesta = await pool.query('SELECT pu.idpuc, cpuc.cap_nombre, cl.cli_nombre, cl.cli_nit, pu.puc_nombre FROM categoriaspuc cpuc INNER JOIN puc pu ON cpuc.idcategoriaspuc=pu.puc_categoria INNER JOIN clientes cl ON pu.puc_cliente=cl.idclientes');

  res.json(respuesta)

}

puccontrollers.getitembyid = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT pu.idpuc, cpuc.cap_nombre, cl.cli_nombre, cl.cli_nit, pu.puc_nombre FROM categoriaspuc cpuc INNER JOIN puc pu ON cpuc.idcategoriaspuc=pu.puc_categoria INNER JOIN clientes cl ON pu.puc_cliente=cl.idclientes WHERE pu.idpuc  =?', [id]);
  res.json(respuesta)

}

// listar puc por categoria

puccontrollers.getitembycat = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT pu.idpuc, cpuc.cap_nombre, cl.cli_nombre, cl.cli_nit, pu.puc_nombre FROM categoriaspuc cpuc INNER JOIN puc pu ON cpuc.idcategoriaspuc=pu.puc_categoria INNER JOIN clientes cl ON pu.puc_cliente=cl.idclientes WHERE cpuc.idcategoriaspuc  =?', [id]);
  res.json(respuesta)

}

// listar puc por cliente

puccontrollers.getitembycli = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT pu.idpuc, cpuc.cap_nombre, cl.cli_nombre, cl.cli_nit, pu.puc_nombre FROM categoriaspuc cpuc INNER JOIN puc pu ON cpuc.idcategoriaspuc=pu.puc_categoria INNER JOIN clientes cl ON pu.puc_cliente=cl.idclientes WHERE cl.idclientes  =?', [id]);
  res.json(respuesta)

}

puccontrollers.createitem = async (req, res) => {


  const { puc_categoria, puc_cliente, puc_nombre, puc_codigo } = req.body;
  const newitem = { puc_categoria, puc_cliente, puc_nombre, puc_codigo }

  const existecli = await helpers.verifyexist('clientes', 'idclientes', newitem.puc_cliente)
  const existecat = await helpers.verifyexist('categoriaspuc', 'idcategoriaspuc', newitem.puc_categoria)

  if (existecli) {
    if (existecat) {
      await pool.query('INSERT INTO puc set?', [newitem]);
      res.json({ mensjae: 'puc resitrado' })
    } else {
      res.json({ mensjae: 'no existe una categoria para el puc que quiere registrar' })
    }

  } else {
    res.json({ mensjae: 'no existe un cliente para crear este puc' })
  }









}



puccontrollers.edititem = async (req, res) => {
  const id = req.params.id;
  const { puc_categoria, puc_cliente, puc_nombre, puc_codigo } = req.body;
  const editeditem = { puc_categoria, puc_cliente, puc_nombre, puc_codigo }
  const existecli = await helpers.verifyexist('clientes', 'idclientes', editeditem.puc_cliente)
  const existecat = await helpers.verifyexist('categoriaspuc', 'idcategoriaspuc', editeditem.puc_categoria)
  if (existecli) {
    if (existecat) {
      await pool.query('UPDATE puc set ? WHERE idpuc=?', [editeditem, id]);
      res.json({ mensaje: 'puc editado' })
    } else {
      res.json({ mensaje: 'la categoria que quiere editar en este puc no existe' })
    }

  } else {
    res.json({ mensaje: 'el cliente que quiere editar en este puc no existe' })
  }



}


module.exports = puccontrollers;