
const pool = require('../database');
const helpers = require('../lib/helpers');

const transaccionescontrollers = {};

transaccionescontrollers.listitem = async (req, res) => {
  const respuesta = await pool.query('SELECT t.idtransacciones, tt.ttr_nombre, ter.ter_nombre, cl.cli_nit, p.pro_nombre, pu.puc_nombre, t.tra_numero, t.tra_valor, t.tra_descripcion, t.tra_estadopgo FROM tipostransacciones tt INNER JOIN transacciones t ON t.tra_tipo=tt.idtipostransacciones INNER JOIN terceros ter ON t.tra_tercero=ter.idterceros INNER JOIN clientes cl ON ter.ter_identificacion = cl.idclientes INNER JOIN puc pu ON t.tra_puc=pu.idpuc INNER JOIN productos p ON t.tra_producto=p.idproductos');

  res.json(respuesta)

}





transaccionescontrollers.getitembyid = async (req, res) => {
  const id = req.params.id;
  const respuesta = await pool.query('SELECT t.idtransacciones, tt.ttr_nombre, ter.ter_nombre, cl.cli_nit, p.pro_nombre, pu.puc_nombre, t.tra_numero, t.tra_valor, t.tra_descripcion, t.tra_estadopgo FROM tipostransacciones tt INNER JOIN transacciones t ON t.tra_tipo=tt.idtipostransacciones INNER JOIN terceros ter ON t.tra_tercero=ter.idterceros INNER JOIN clientes cl ON ter.ter_identificacion = cl.idclientes INNER JOIN puc pu ON t.tra_puc=pu.idpuc INNER JOIN productos p ON t.tra_producto=p.idproductos WHERE t.idtransacciones   =?', [id]);

  res.json(respuesta)


}

transaccionescontrollers.createitem = async (req, res) => {


  const { tra_tipo, tra_tercero, tra_producto, tra_puc, tra_numero, tra_valor, tra_descripcion, tra_estadopgo } = req.body;
  const newitem = { tra_tipo, tra_tercero, tra_producto, tra_puc, tra_numero, tra_valor, tra_descripcion, tra_estadopgo }
  const existetipo = await helpers.verifyexist('tipostransacciones', 'idtipostransacciones', newitem.tra_tipo)
  const existetercero = await helpers.verifyexist('terceros', 'idterceros', newitem.tra_tercero)
  const existeproducto = await helpers.verifyexist('productos', 'idproductos', newitem.tra_producto)
  const existepuc = await helpers.verifyexist('puc', 'idpuc', newitem.tra_puc)
  if (existetipo) {
    if (existetercero) {
      if (existeproducto) {
        if (existepuc) {
          await pool.query('INSERT INTO transacciones set?', [newitem]);
          res.json({ mensaje: 'transaccion registrada' })
        } else {
          res.json({ mensaje: 'no existe un puc para crear esta transacción' })
        }


      } else {
        res.json({ mensaje: 'no existe un producto para crear esta transacción' })
      }


    } else {
      res.json({ mensaje: 'no existe un tercero para crear esta transacción' })
    }


  } else {
    res.json({ mensaje: 'no existe un tipo para crear esta transacción' })
  }
}



transaccionescontrollers.edititem = async (req, res) => {
  const id = req.params.id;
  const { tra_tipo, tra_tercero, tra_producto, tra_puc, tra_numero, tra_valor, tra_descripcion, tra_estadopgo } = req.body;
  const editeditem = { tra_tipo, tra_tercero, tra_producto, tra_puc, tra_numero, tra_valor, tra_descripcion, tra_estadopgo }

  const existetipo = await helpers.verifyexist('tipostransacciones', 'idtipostransacciones', editeditem.tra_tipo)
  const existetercero = await helpers.verifyexist('terceros', 'idterceros', editeditem.tra_tercero)
  const existeproducto = await helpers.verifyexist('productos', 'idproductos', editeditem.tra_producto)
  const existepuc = await helpers.verifyexist('puc', 'idpuc', editeditem.tra_puc)

  if (existetipo) {
    if (existetercero) {
      if (existeproducto) {
        if (existepuc) {

  await pool.query('UPDATE transacciones set ? WHERE idtransacciones=?', [editeditem, id]);
  res.json({ mensaje: 'transsacción editada' })
} else {
  res.json({ mensaje: 'no existe un puc para editar esta transacción' })
}


} else {
res.json({ mensaje: 'no existe un producto para editar esta transacción' })
}


} else {
res.json({ mensaje: 'no existe un tercero para editar esta transacción' })
}


} else {
res.json({ mensaje: 'no existe un tipo para editar esta transacción' })
}






}



transaccionescontrollers.deleteitem = async (req, res) => {
  const id = req.params.id;

  await pool.query('DELETE FROM transacciones  WHERE idtransacciones=?', [id]);

  res.json({ menssaje: 'transacción eliminada' })


}
module.exports = transaccionescontrollers;