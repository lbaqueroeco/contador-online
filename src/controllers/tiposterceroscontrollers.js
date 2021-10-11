const pool = require('../database');
const helpers = require('../lib/helpers');

const tiposterceroscontrollers = {};

tiposterceroscontrollers.listtter = async (req, res) => {
  const respuesta = await pool.query('SELECT * FROM tiposterceros');

  res.json(respuesta)

}

tiposterceroscontrollers.getitterbyid = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT * FROM tiposterceros WHERE idtiposterceros=?', [id]);

  res.json(
    respuesta
  )


}

tiposterceroscontrollers.creattter = async (req, res) => {

  const { tte_nombre } = req.body;
  const newtter = { tte_nombre }
  const existe = await helpers.verifyexist('tiposterceros', 'tte_nombre', newtter.tte_nombre)
  if (existe) {
    res.json({ status: 'tipo de tercero ya existe' })
  }
  else {
    await pool.query('INSERT INTO tiposterceros set?', [newtter]);

    res.json({ mensaje: 'tipo de tercero registrado' })
  }
}

tiposterceroscontrollers.edittter = async (req, res) => {
  const id = req.params.id;
  const { tte_nombre } = req.body;
  const editetter = { tte_nombre }
  const existec = await helpers.verifyexist('tiposterceros', 'idtiposterceros', id)
  if (existec) {
    await pool.query('UPDATE tiposterceros set ? WHERE idtiposterceros=?', [editetter, id]);
    res.json({ mensaje: 'tipo de tercero editado' })
  }
  else {
    res.json({ mensaje: 'el tipo de tercero que quiere editar no existe' })
  }


}



module.exports = tiposterceroscontrollers;
