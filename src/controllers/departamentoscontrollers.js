const pool = require('../database');
const helpers = require('../lib/helpers');

const departamentoscontrollers = {};

departamentoscontrollers.listdep = async (req, res) => {
  const respuesta = await pool.query('SELECT iddepartamentos, dep_codigo, dep_nombre FROM departamentos');

  res.json(respuesta)

}

departamentoscontrollers.getidepbyid = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT SELECT iddepartamentos, dep_codigo, dep_nombre FROM departamentos WHERE iddepartamentos=?', [id]);

  res.json(
    respuesta
  )


}
/*

departamentoscontrollers.createdep = async (req, res) => {

  const { dep_codigo, dep_nombre } = req.body;
  const newcdep = { dep_codigo, dep_nombre }
  const existeN = await helpers.verifyexist('departamentos', 'dep_nombre', newcdep.dep_nombre)
  const existeC = await helpers.verifyexist('departamentos', 'dep_codigo', newcdep.dep_codigo)
  if (existeN ||existeC ) {
    res.json({ mensaje: 'el departamento ya existe' })
  }
  else {
    await pool.query('INSERT INTO departamentos set?', [newcdep]);

    res.json({ mensaje: 'departamento registrado' })
  }
}*/
departamentoscontrollers.editdep = async (req, res) => {
  const id = req.params.id;
  const { dep_codigo, dep_nombre } = req.body;
  const editedep = { dep_codigo, dep_nombre }
  const existed = await helpers.verifyexist('departamentos', 'iddepartamentos', id)
  if (existed) {
    await pool.query('UPDATE departamentos set ? WHERE iddepartamentos=?', [editedep, id]);
    res.json({ mensaje: 'departamento editado' })
  }
  else {
    res.json({ mensaje: 'el departamento que quiere editar no existe' })
  }


}


module.exports = departamentoscontrollers;
