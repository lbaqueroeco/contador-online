const pool = require('../database');
const helpers = require('../lib/helpers');

const categoriascontrollers = {};

categoriascontrollers.listcat = async (req, res) => {
  const respuesta = await pool.query('SELECT idcategorias, cat_nombre FROM categoria');

  res.json(respuesta)

}

categoriascontrollers.geticatbyid = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT idcategorias, cat_nombre  FROM categoria WHERE idcategorias=?', [id]);

  res.json(
    respuesta
  )


}

categoriascontrollers.createcat = async (req, res) => {

  const { cat_nombre } = req.body;
  const newcat = { cat_nombre }
  const existe = await helpers.verifyexist('categoria', 'cat_nombre', newcat.cat_nombre)
  if (existe) {
    res.json({ mensaje: 'categoria ya existe' })
  }
  else {
    await pool.query('INSERT INTO categoria set?', [newcat]);

    res.json({ mensaje: 'categoria registrada' })
  }
}

categoriascontrollers.editcat = async (req, res) => {
  const id = req.params.id;
  const { cat_nombre } = req.body;
  const editecat = { cat_nombre }
  const existec = await helpers.verifyexist('categoria', 'idcategorias', id)
  if (existec) {
    await pool.query('UPDATE categoria set ? WHERE idcategorias=?', [editecat, id]);
    res.json({ mensaje: 'categoria editada' })
  }
  else {
    res.json({ mensaje: 'la categoría que quiere editar no existe' })
  }


}


module.exports = categoriascontrollers;
