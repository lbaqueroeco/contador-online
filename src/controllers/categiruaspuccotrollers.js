const pool = require('../database');
const helpers = require('../lib/helpers');

const categiruaspuccotrollers = {};

categiruaspuccotrollers.listcatpuc = async (req, res) => {
  const respuesta = await pool.query('SELECT idcategoriaspuc, cap_nombre, cap_codigo FROM categoriaspuc');

  res.json(respuesta)

}

categiruaspuccotrollers.geticatbyidpuc = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT idcategoriaspuc, cap_nombre, cap_codigo FROM categoriaspuc WHERE idcategoriaspuc=?', [id]);

  res.json(
    respuesta
  )


}

categiruaspuccotrollers.createcatpuc = async (req, res) => {

  const { cap_nombre,cap_codigo } = req.body;
  const newcat = { cap_nombre,cap_codigo } 
  const existe = await helpers.verifyexist('categoriaspuc', 'cap_nombre', newcat.cap_nombre)
  if (existe) {
    res.json({ mensaje: 'categoria ya existe' })
  }
  else {
    await pool.query('INSERT INTO categoriaspuc set?', [newcat]);

    res.json({ mensaje: 'categoria puc registrada' })
  }
}

categiruaspuccotrollers.editcatpuc = async (req, res) => {
  const id = req.params.id;
  const { cap_nombre,cap_codigo } = req.body;
  const editecat = { cap_nombre,cap_codigo }
  const existec = await helpers.verifyexist('categoriaspuc', 'idcategoriaspuc', id)
  if (existec) {
    await pool.query('UPDATE categoriaspuc set ? WHERE idcategoriaspuc=?', [editecat, id]);
    res.json({ mensaje: 'categoria puc editada' })
  }
  else {
    res.json({ mensaje: 'la categoría puc que quiere editar no existe' })
  }


}


module.exports = categiruaspuccotrollers;
