const pool = require('../database');
const helpers = require('../lib/helpers');

const nominacontrollers = {};

nominacontrollers.listitem = async (req, res) => {
  const respuesta = await pool.query('SELECT n.idnomina, cl.idclientes, cl.cli_nombre, cl.cli_nit, cl.cli_email, cl.cli_telefono, n.nom_direccion, n.nom_salario FROM clientes cl INNER JOIN nomina n ON cl.idclientes=n.nom_cliente ');

  res.json(respuesta)

}


nominacontrollers.getitembyid = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT  n.idnomina, cl.idclientes, cl.cli_nombre, cl.cli_nit, cl.cli_email, cl.cli_telefono, n.nom_direccion, n.nom_salario FROM clientes cl INNER JOIN nomina n ON cl.idclientes=n.nom_cliente WHERE n.idnomina  =?', [id]);
  res.json(respuesta)


}

// listar nomina por cliente
nominacontrollers.getitembycli = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT  n.idnomina, cl.idclientes, cl.cli_nombre, cl.cli_nit, cl.cli_email, cl.cli_telefono, n.nom_direccion, n.nom_salario FROM clientes cl INNER JOIN nomina n ON cl.idclientes=n.nom_cliente WHERE cl.idclientes=?', [id]);
  res.json(respuesta)


}


nominacontrollers.createitem = async (req, res) => {


  const { nom_cliente, nom_salario } = req.body;
  const newitem = { nom_cliente, nom_salario }
  const existetercliente = await helpers.verifyexist('clientes', 'idclientes', newitem.nom_cliente)
  if (existetercliente) {
    const rows = await pool.query('SELECT cli_nombre, cli_nit, cli_email, cli_telefono, cli_contacto FROM clientes WHERE idclientes=?', [newitem.nom_cliente]);
    const newnom ={
      nom_cliente:newitem.nom_cliente,
      nom_nombre: rows[0].cli_nombre,
      nom_cedula: rows[0].cli_nit,
      nom_email:rows[0].cli_email,
      nom_telefono:rows[0].cli_telefono,
      nom_direccion:rows[0].cli_contacto,
      nom_salario:newitem.nom_salario
    }
    console.log(rows[0].cli_nombre)
    await pool.query('INSERT INTO nomina set?', [newnom]);
    res.json({ mensjae: 'item registrado' })
  } else {
    res.json({ mensaje: 'el item de nomina a crear debe estar asociado a un cliente' })
  }

  /*
  nominacontrollers.createitem = async (req,res) => {
    
  
    const {nom_cliente,nom_nombre, nom_cedula, nom_email,nom_telefono, nom_direccion, nom_salario} =req.body;
    const newitem= {nom_cliente,nom_nombre, nom_cedula, nom_email,nom_telefono, nom_direccion, nom_salario}
    const existetercliente = await helpers.verifyexist('clientes', 'idclientes', newitem.nom_cliente)
    if(existetercliente){
  
      await pool.query('INSERT INTO nomina set?', [newitem]);
      res.json({mensjae: 'item registrado'})
    }else{
      res.json({mensaje: 'el item de nomina a crear debe estar asociado a un cliente'})
    }
  
    */




}



nominacontrollers.edititem = async (req, res) => {
  const id = req.params.id;
  const { nom_cliente, nom_nombre, nom_cedula, nom_email, nom_telefono, nom_direccion, nom_salario } = req.body;
  const editeditem = { nom_cliente, nom_nombre, nom_cedula, nom_email, nom_telefono, nom_direccion, nom_salario }

  await pool.query('UPDATE nomina set ? WHERE idnomina  =?', [editeditem, id]);
  console.log(req.params.id)

  res.json({ status: 'item editado' })


}

nominacontrollers.deleteitem = async (req, res) => {
  const id = req.params.id;

  await pool.query('DELETE FROM inventarios  WHERE idinventarios =?', [id]);
  console.log(req.params.id)

  res.json({ status: 'item eliminado' })


}
module.exports = nominacontrollers;