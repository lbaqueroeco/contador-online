const pool = require('../database');
const helpers = require('../lib/helpers');

const tipostransaccionescontrolles = {};

tipostransaccionescontrolles.listtt = async (req, res) => {
  const respuesta = await pool.query('SELECT idtipostransacciones, ttr_nombre FROM tipostransacciones');

  res.json(respuesta)

}

tipostransaccionescontrolles.getittbyid = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT idtipostransacciones, ttr_nombre FROM tipostransacciones WHERE idtipostransacciones=?', [id]);

  res.json(
    respuesta
  )


}

tipostransaccionescontrolles.creatett = async (req, res) => {

  const { ttr_nombre } = req.body;
  const newtter = { ttr_nombre }
  const existe = await helpers.verifyexist('tipostransacciones', 'ttr_nombre', newtter.ttr_nombre)
  if (existe) {
    res.json({ status: 'tipo de transacción ya existe' })
  }
  else {
    await pool.query('INSERT INTO tipostransacciones set?', [newtter]);

    res.json({ mensaje: 'tipo de transacción registrada' })
  }
}

tipostransaccionescontrolles.edittt = async (req, res) => {
  const id = req.params.id;
  const { ttr_nombre } = req.body;
  const editetter = { ttr_nombre }
  const existec = await helpers.verifyexist('tipostransacciones', 'idtipostransacciones', id)
  if (existec) {
    await pool.query('UPDATE tipostransacciones set ? WHERE idtipostransacciones=?', [editetter, id]);
    res.json({ mensaje: 'tipo de transacción editada' })
  }
  else {
    res.json({ mensaje: 'el tipo de transacción que quiere editar no existe' })
  }


}



module.exports = tipostransaccionescontrolles;
