const pool = require('../database');
const helpers = require('../lib/helpers');


const terceroscontrollers = {};

terceroscontrollers.listter = async (req, res) => {
  const respuesta = await pool.query('SELECT t.idterceros, tt.tte_nombre, t.ter_nombre, cl.cli_nit, t.ter_telefono, t.ter_direccion, c.ciu_nombre, t.ter_contacto, t.ter_email  FROM ciudades c INNER JOIN terceros t ON c.idciudades=t.ter_ciudad INNER JOIN clientes cl ON cl.idclientes= t.ter_identificacion INNER JOIN tiposterceros tt ON t.ter_tipo = tt.idtiposterceros');
 
 
  res.json(respuesta)

}

terceroscontrollers.getitermyid= async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT t.idterceros, tt.tte_nombre, t.ter_nombre, cl.cli_nit, t.ter_telefono, t.ter_direccion, c.ciu_nombre, t.ter_contacto, t.ter_email  FROM ciudades c INNER JOIN terceros t ON c.idciudades=t.ter_ciudad INNER JOIN clientes cl ON cl.idclientes= t.ter_identificacion INNER JOIN tiposterceros tt ON t.ter_tipo = tt.idtiposterceros WHERE t.idterceros=?', [id]);

  res.json(respuesta)


}

// listar tercero por tipo


terceroscontrollers.getbytipo= async (req, res) => {
  const id = req.params.id;

  const respuesta = await pool.query('SELECT t.idterceros, tt.tte_nombre, t.ter_nombre, cl.cli_nit, t.ter_telefono, t.ter_direccion, c.ciu_nombre, t.ter_contacto, t.ter_email FROM ciudades c INNER JOIN terceros t ON c.idciudades=t.ter_ciudad INNER JOIN clientes cl ON cl.idclientes= t.ter_identificacion INNER JOIN tiposterceros tt ON t.ter_tipo = tt.idtiposterceros WHERE tt.idtiposterceros=?', [id]);

  res.json(respuesta)


}



terceroscontrollers.getbyciudad= async (req, res) => {
  const id = req.params.id;

  const respuesta = await pool.query('SELECT t.idterceros, tt.tte_nombre, t.ter_nombre, cl.cli_nit, t.ter_telefono, t.ter_direccion, c.ciu_nombre, t.ter_contacto, t.ter_email  FROM ciudades c INNER JOIN terceros t ON c.idciudades=t.ter_ciudad INNER JOIN clientes cl ON cl.idclientes= t.ter_identificacion JOIN tiposterceros tt ON t.ter_tipo = tt.idtiposterceros WHERE t.ter_ciudad=?', [id]);

  res.json(respuesta)


}

// listar terceros por departamento
terceroscontrollers.getbydpto= async (req, res) => {
  const id = req.params.id;

  const respuesta = await pool.query('SELECT t.idterceros, tt.tte_nombre, t.ter_nombre, cl.cli_nit, t.ter_telefono, t.ter_direccion, t.ter_contacto, t.ter_email, c.ciu_nombre, d.dep_nombre FROM departamentos d INNER JOIN ciudades c ON c.ciu_iddepartamento=d.iddepartamentos INNER JOIN terceros t ON c.idciudades=t.ter_ciudad INNER JOIN clientes cl ON cl.idclientes= t.ter_identificacion INNER JOIN tiposterceros tt ON t.ter_tipo = tt.idtiposterceros WHERE d.iddepartamentos=?', [id]);
  
  res.json(respuesta)


}

// listar terceros por ciudad que sean compradores

terceroscontrollers.getbyciudadcom= async (req, res) => {
  const id = req.params.id;
 
  const respuesta = await pool.query('SELECT t.idterceros, tt.tte_nombre, t.ter_nombre, cl.cli_nit, t.ter_telefono, t.ter_direccion, c.ciu_nombre, t.ter_contacto, t.ter_email  FROM ciudades c INNER JOIN terceros t ON c.idciudades=t.ter_ciudad INNER JOIN clientes cl ON cl.idclientes= t.ter_identificacion INNER JOIN tiposterceros tt ON t.ter_tipo = tt.idtiposterceros WHERE t.ter_ciudad=? AND tt.tte_nombre="comprador"', [id]);

  res.json(respuesta)


}


// listar terceros por ciudad que sean vendedores
terceroscontrollers.getbyciudadven= async (req, res) => {
  const id = req.params.id;
 
  const respuesta = await pool.query('SELECT t.idterceros, tt.tte_nombre, t.ter_nombre, cl.cli_nit, t.ter_telefono, t.ter_direccion, c.ciu_nombre, t.ter_contacto, t.ter_email  FROM ciudades c INNER JOIN terceros t ON c.idciudades=t.ter_ciudad INNER JOIN clientes cl ON cl.idclientes= t.ter_identificacion INNER JOIN tiposterceros tt ON t.ter_tipo = tt.idtiposterceros WHERE t.ter_ciudad=? AND tt.tte_nombre="vendedor"', [id]);

  res.json(respuesta)


}

// listar terceros por ciudad que sean mixtos

terceroscontrollers.getbyciudadmix= async (req, res) => {
  const id = req.params.id;
 
  const respuesta = await pool.query('SELECT t.idterceros, tt.tte_nombre, t.ter_nombre, cl.cli_nit, t.ter_telefono, t.ter_direccion, c.ciu_nombre, t.ter_contacto, t.ter_email  FROM ciudades c INNER JOIN terceros t ON c.idciudades=t.ter_ciudad JOIN clientes cl ON cl.idclientes= t.ter_identificacion INNER JOIN tiposterceros tt ON t.ter_tipo = tt.idtiposterceros WHERE t.ter_ciudad=? AND tt.tte_nombre="mixto"', [id]);

  res.json(respuesta)


}





// listar terceros por departamento que sean compradores

terceroscontrollers.getbydptocom= async (req, res) => {
  const id = req.params.id;
 
  const respuesta = await pool.query('SELECT t.idterceros, tt.tte_nombre, t.ter_nombre, cl.cli_nit, t.ter_telefono, t.ter_direccion, c.ciu_nombre, t.ter_contacto, t.ter_email  FROM departamentos d INNER JOIN ciudades c ON c.ciu_iddepartamento=d.iddepartamentos INNER JOIN terceros t ON c.idciudades=t.ter_ciudad INNER JOIN clientes cl ON cl.idclientes= t.ter_identificacion INNER JOIN tiposterceros tt ON t.ter_tipo = tt.idtiposterceros WHERE d.iddepartamentos=? AND tt.tte_nombre="comprador"', [id]);

  res.json(respuesta)


}

// listar terceros por departamento que sean vendedores

terceroscontrollers.getbydptoven= async (req, res) => {
  const id = req.params.id;
 
  const respuesta = await pool.query('SELECT t.idterceros, tt.tte_nombre, t.ter_nombre, cl.cli_nit, t.ter_telefono, t.ter_direccion, c.ciu_nombre, t.ter_contacto, t.ter_email  FROM departamentos d INNER JOIN ciudades c ON c.ciu_iddepartamento=d.iddepartamentos INNER JOIN terceros t ON c.idciudades=t.ter_ciudad INNER JOIN clientes cl ON cl.idclientes= t.ter_identificacion INNER JOIN tiposterceros tt ON t.ter_tipo = tt.idtiposterceros WHERE d.iddepartamentos=? AND tt.tte_nombre="vendedor"', [id]);

  res.json(respuesta)

}

// listar terceros por departamento que sean mixtos

terceroscontrollers.getbydptomix= async (req, res) => {
  const id = req.params.id;
 
  const respuesta = await pool.query('SELECT t.idterceros, tt.tte_nombre, t.ter_nombre, cl.cli_nit, t.ter_telefono, t.ter_direccion, c.ciu_nombre, t.ter_contacto, t.ter_email  FROM departamentos d INNER JOIN ciudades c ON c.ciu_iddepartamento=d.iddepartamentos INNER JOIN terceros t ON c.idciudades=t.ter_ciudad INNER JOIN clientes cl ON cl.idclientes= t.ter_identificacion INNER JOIN tiposterceros tt ON t.ter_tipo = tt.idtiposterceros WHERE d.iddepartamentos=? AND tt.tte_nombre="mixto"', [id]);

  res.json(respuesta)

}


terceroscontrollers.createter = async (req, res) => {
  const { ter_tipo, ter_nombre, ter_identificacion, ter_telefono, ter_direccion, ter_ciudad, ter_contacto, ter_email} = req.body;
  const newter = { ter_tipo, ter_nombre, ter_identificacion, ter_telefono, ter_direccion, ter_ciudad, ter_contacto, ter_email} 
  const existeter = await helpers.verifyexist('terceros', 'ter_nombre', newter.ter_nombre)
  const existetertipo = await helpers.verifyexist('tiposterceros', 'idtiposterceros', newter.ter_tipo)
  const existetercliente = await helpers.verifyexist('clientes', 'idclientes', newter.ter_identificacion)
  const existeciudad = await helpers.verifyexist('ciudades', 'idciudades', newter.ter_ciudad)
  if (!existeter) {
    if (existetertipo) {
      if(existeciudad){
        if(existetercliente){
        await pool.query('INSERT INTO terceros set?', [newter]);

        res.json({ mensaje: 'tercero registrado' })
    

      }else{
        res.json({ mensaje: 'el tercero debe estar asociado a un cliente' })
      }
    }else{
        res.json({ mensaje: 'no existe una ciudad para asociar el tercero, por favor cree una' })
    }
    }else{
        res.json({ mensaje: 'no existe el tipo de tercero' })
    }
    
  } else {
    res.json({ mensaje: 'el tercero ya existe' })
  }
};

terceroscontrollers.editter= async (req, res) => {
  const id = req.params.id;
  const  { ter_tipo, ter_nombre, ter_identificacion, ter_telefono, ter_direccion, ter_ciudad, ter_contacto, ter_email} = req.body;
  const editedter=  { ter_tipo, ter_nombre, ter_identificacion, ter_telefono, ter_direccion, ter_ciudad, ter_contacto, ter_email}
  const existe = await helpers.verifyexist('terceros', 'idterceros', id)
  const existetertipo = await helpers.verifyexist('tiposterceros', 'idtiposterceros', editedter.ter_tipo)
  const existetercliente = await helpers.verifyexist('clientes', 'idclientes', editedter.ter_identificacion)
  const existeciudad = await helpers.verifyexist('ciudades', 'idciudades', editedter.ter_ciudad)
  if(existe){
    if(existetercliente){
      if(existetertipo){
        if(existeciudad){
          await pool.query('UPDATE terceros set ? WHERE idterceros=?', [editedter, id]);
          res.json({ mensaje: 'tercero editado' })
        } else{
          res.json({ mensaje: 'la ciudad que quiere asociar a este tercero no existe' })

        }
       
 } else{

        res.json({ mensaje: 'el tipo de tercero que quiere asociar a este tercero no existe' })
      }
   } else{
      res.json({ mensaje: 'el cliente que quiere asociar a este tercero no existe' })

    }
    
  
  }else{
    res.json({ mensaje: 'el tercero que quiere editar no existe' })
  }
}


module.exports = terceroscontrollers;