
const pool = require('../database');
const helpers = require('../lib/helpers');

const ciudadescontrollers = {};

ciudadescontrollers.listciu = async (req, res) => {
  const respuesta = await pool.query('SELECT c.ciu_codigo, c.ciu_nombre, d.dep_nombre FROM ciudades c INNER JOIN departamentos d ON c.ciu_iddepartamento=d.iddepartamentos');

  res.json(respuesta)

}

ciudadescontrollers.geticiubyid = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT c.ciu_codigo, c.ciu_nombre, d.dep_nombre FROM ciudades c INNER JOIN departamentos d ON c.ciu_iddepartamento=d.iddepartamentos WHERE c.idciudades=?', [id]);

  res.json(
    respuesta
  )

}

// listar ciudades por departamento

ciudadescontrollers.geticiubydep = async (req, res) => {
  // se podria hacer con el nombre del departamento pero hay que arreglar los caracteres del archivo
  const id = req.params.id;
  const respuesta = await pool.query('SELECT c.ciu_codigo, c.ciu_nombre, d.dep_nombre FROM ciudades c INNER JOIN departamentos d ON c.ciu_iddepartamento=d.iddepartamentos WHERE d.iddepartamentos=?', [id]);

  res.json(
    respuesta
  )

}


ciudadescontrollers.createciu = async (req, res) => {



  const { ciu_codigo, ciu_nombre, ciu_iddepartamento } = req.body;
  const newcciu = { ciu_codigo, ciu_nombre, ciu_iddepartamento } 
  const existec = await helpers.verifyexist('ciudades', 'ciu_codigo', newcciu.ciu_codigo)
  const existed = await helpers.verifyexist('departamentos', 'iddepartamentos', newcciu.ciu_iddepartamento)
  if (existec ) {
    res.json({ mensaje: 'la ciudad ya existe' })
  }
  else {
      if(existed){
        await pool.query('INSERT INTO ciudades set?', [newcciu]);

        res.json({ mensaje: 'ciudad registrada' })
      }else{

        res.json({ mensaje: 'Debe crear un departamento para esta ciudad' })

      }
   
  }
}

ciudadescontrollers.editciu = async (req, res) => {
  const id = req.params.id;
  const { ciu_codigo, ciu_nombre, ciu_iddepartamento } = req.body;
  const editeciu = { ciu_codigo, ciu_nombre, ciu_iddepartamento }
  const existec = await helpers.verifyexist('ciudades', 'idciudades', id)
  const existed = await helpers.verifyexist('departamentos', 'iddepartamentos', editeciu.ciu_iddepartamento)
  if (existec) {
    if (existed) {

    await pool.query('UPDATE ciudades set ? WHERE idciudades=?', [editeciu, id]);
    res.json({ mensaje: 'ciudad editada' })
    }else{
      res.json({ mensaje: 'No existe un departamento para esta ciudad, por favor cree uno' })
    }
  }
  else {
    res.json({ mensaje: 'la ciudad que quiere editar no existe' })
  }


}


module.exports = ciudadescontrollers;
