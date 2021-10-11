const pool = require('../database');
const helpers = require('../lib/helpers');


const clientescotrollers = {};

clientescotrollers.listcli = async (req, res) => {
  const respuesta = await pool.query('SELECT cl.idclientes, cl.cli_nombre, cl.cli_nit, cl.cli_email, cl.cli_telefono, cl.cli_contacto, ci.ciu_nombre, d.dep_nombre FROM clientes cl INNER JOIN ciudades ci  ON cl.cli_ciudad=ci.idciudades JOIN departamentos d ON ci.ciu_iddepartamento=d.iddepartamentos');

  res.json(respuesta)

}

clientescotrollers.geticlimyid = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT cl.idclientes, cl.cli_nombre, cl.cli_nit, cl.cli_email, cl.cli_telefono, cl.cli_contacto, ci.ciu_nombre, d.dep_nombre FROM clientes cl INNER JOIN ciudades ci  ON cl.cli_ciudad=ci.idciudades INNER JOIN departamentos d ON ci.ciu_iddepartamento=d.iddepartamentos WHERE idclientes =?', [id]);

  res.json(respuesta)


}

// listar clientes por ciudad
clientescotrollers.geticlibyc = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT cl.idclientes, cl.cli_nombre, cl.cli_nit, cl.cli_email, cl.cli_telefono, cl.cli_contacto, ci.ciu_nombre, d.dep_nombre FROM clientes cl INNER JOIN ciudades ci  ON cl.cli_ciudad=ci.idciudades INNER JOIN departamentos d ON ci.ciu_iddepartamento=d.iddepartamentos WHERE ci.idciudades =?', [id]);

  res.json(respuesta)

}

// listar clientes por departamento
clientescotrollers.geticlibyd = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT cl.idclientes, cl.cli_nombre, cl.cli_nit, cl.cli_email, cl.cli_telefono, cl.cli_contacto, ci.ciu_nombre, d.dep_nombre FROM clientes cl JOIN ciudades ci  ON cl.cli_ciudad=ci.idciudades JOIN departamentos d ON ci.ciu_iddepartamento=d.iddepartamentos WHERE d.iddepartamentos =?', [id]);

  res.json(respuesta)

}

clientescotrollers.createcli = async (req, res) => {
  const { cli_nombre, cli_nit, cli_email, cli_telefono, cli_contacto, cli_ciudad } = req.body;
  const newcli = { cli_nombre, cli_nit, cli_email, cli_telefono, cli_contacto, cli_ciudad } 
  const existecliente = await helpers.verifyexist('clientes', 'cli_email', newcli.cli_email)
  const existeciudad = await helpers.verifyexist('ciudades', 'idciudades', newcli.cli_ciudad)
  if (!existecliente) {
      if(existeciudad){
        await pool.query('INSERT INTO clientes set?', [newcli]);

        res.json({ mensaje: 'cliente registrado' })
    

      }else{
        res.json({ mensaje: 'no existe una ciudad para asociar al cliente, por favor cree una' })
      }
    
  } else {
    res.json({ mensaje: 'el cliente ya existe' })
  }
};

clientescotrollers.editcli= async (req, res) => {
  const id = req.params.id;
  const { cli_nombre, cli_nit, cli_email, cli_telefono, cli_contacto, cli_ciudad }= req.body;
  const editedcli = { cli_nombre, cli_nit, cli_email, cli_telefono, cli_contacto, cli_ciudad }
  const existe = await helpers.verifyexist('clientes', 'idclientes', id)
  const existeciudad = await helpers.verifyexist('ciudades', 'idciudades', editedcli.cli_ciudad)
  
  if(existe){
    if(existeciudad){
     
        await pool.query('UPDATE clientes set ? WHERE idclientes=?', [editedcli, id]);
        res.json({ mensaje: 'Cliente editado' })

     
     

    }else{
      res.json({ mensaje: 'No existe una ciudad para asignar a este cliente' })
    }
    
     
  }else{
    res.json({ mensaje: 'el cliente que quiere editar no existe' })
  }
}


module.exports = clientescotrollers;