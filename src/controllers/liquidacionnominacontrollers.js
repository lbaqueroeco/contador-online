
const pool = require('../database');
const helpers = require('../lib/helpers');

const liquidacionnominacontrollers = {};

liquidacionnominacontrollers.listitem = async (req,res) => {

 const respuesta = await pool.query('SELECT ln.idliqnomina, cl.cli_nombre, cl.cli_nit, ln.lnom_valor, ln.lnom_fecha, ln.lmon_salud, ln.lnom_arl, ln.lnom_caja, ln.lnom_cesantias, ln.lnom_prima FROM liquidacion_nomina ln INNER JOIN nomina n ON ln.lnom_nomima=n.idnomina INNER JOIN clientes cl ON cl.idclientes=n.nom_cliente ');
   
  res.json(respuesta)

}


liquidacionnominacontrollers.getitembyid = async (req,res) => {
  const id  = req.params.id;
  const respuesta = await pool.query('SELECT ln.idliqnomina, cl.cli_nombre, cl.cli_nit, ln.lnom_valor, ln.lnom_fecha, ln.lmon_salud, ln.lnom_arl, ln.lnom_caja, ln.lnom_cesantias, ln.lnom_prima FROM liquidacion_nomina ln INNER JOIN nomina n ON ln.lnom_nomima=n.idnomina INNER JOIN clientes cl ON cl.idclientes=n.nom_cliente  WHERE ln.idliqnomina=?',[id]);
 
res.json(respuesta)

}

liquidacionnominacontrollers.createitem = async (req,res) => {

  const {lnom_valor,lnom_fecha, lmon_salud, lnom_arl,lnom_caja,lnom_cesantias,lnom_prima,lnom_nomima} =req.body;
  const newitem= {lnom_valor,lnom_fecha, lmon_salud, lnom_arl,lnom_caja,lnom_cesantias,lnom_prima,lnom_nomima}
  const existenom = await helpers.verifyexist('nomina', 'idnomina', newitem.lnom_nomima)
  if(existenom){

    await pool.query('INSERT INTO liquidacion_nomina set?', [newitem]);
    res.json({mensjae: 'liquidacion de nomina registrada'})
  }else{
    res.json({mensaje: 'no existe un item en nomina para esta liquidación'})
  }

  
  
    

    
}



liquidacionnominacontrollers.edititem = async (req,res) => {
  const id  = req.params.id;
  const {lnom_valor,lnom_fecha, lmon_salud, lnom_arl,lnom_caja,lnom_cesantias,lnom_prima,lnom_nomima} =req.body;
  const editeditem= {lnom_valor,lnom_fecha, lmon_salud, lnom_arl,lnom_caja,lnom_cesantias,lnom_prima,lnom_nomima}
  const existenom = await helpers.verifyexist('nomina', 'idnomina', editeditem.lnom_nomima)
  if(existenom){

   await pool.query('UPDATE liquidacion_nomina set ? WHERE idliqnomina  =?', [editeditem, id]);
    console.log(req.params.id)

    res.json({mensaje: 'item editado'})

  }else{
    res.json({mensaje: 'no existe en nomina la liquidación que quiere editar'})
  }
}

liquidacionnominacontrollers.deleteitem = async (req,res) => {
  const id  = req.params.id;
   
   await pool.query('DELETE FROM liquidacion_nomina  WHERE idliqnomina =?', [id]);
    console.log(req.params.id)

    res.json({mensaje: 'liquidación eliminada'})

  
}
module.exports = liquidacionnominacontrollers;