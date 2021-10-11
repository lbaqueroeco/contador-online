const pool = require('../database');
const helpers = require('../lib/helpers');

const tiposprodcontrollers = {};

tiposprodcontrollers.listtipprod = async (req, res) => {
  const respuesta = await pool.query('SELECT idtiposproducto, tip_nombre FROM tiposproducto');

  res.json(respuesta)

}

tiposprodcontrollers.getitprodbyid = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT idtiposproducto, tip_nombre FROM tiposproducto WHERE idtiposproducto=?', [id]);

  res.json(
    respuesta
  )


}



tiposprodcontrollers.createtprod = async (req, res) => {

  const { tip_nombre } = req.body;
  const newtprod = { tip_nombre }
  const existe = await helpers.verifyexist('tiposproducto', 'tip_nombre', newtprod.tip_nombre)
  if (existe) {

    res.json({ status: 'tipo de producto ya existe' })
  }
  else {
    await pool.query('INSERT INTO tiposproducto set?', [newtprod]);

    res.json({ mensaje: 'tipo de producto agregado' })
  }
}


tiposprodcontrollers.edittpod = async (req, res) => {

  const id = req.params.id;
  const { tip_nombre } = req.body;
  const edittprod = { tip_nombre }
  const existee = await helpers.verifyexist('tiposproducto', 'idtiposproducto', id)
  if (existee) {

  await pool.query('UPDATE tiposproducto set ? WHERE idtiposproducto=?', [edittprod, id]);
  console.log(req.params.id)

  res.json({ mensaje: 'tipo de producto editado' })
  }else{
    res.json({ mensaje: 'el tipo de producto que desea editar no existe' })
  }


}

module.exports = tiposprodcontrollers;
