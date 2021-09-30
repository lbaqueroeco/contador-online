const pool = require('../database');

const productoscontrolers = {};

productoscontrolers.listproduct = async (req,res) => {
  const respuesta = await pool.query('SELECT * FROM productos ');
   
  res.json(respuesta)

}

productoscontrolers.getprodbyid = async (req,res) => {
  const id  = req.params.id;
  const respuesta = await pool.query('SELECT * FROM productos WHERE id=?',[id]);
 
res.json({
  respuesta
})

  
}

productoscontrolers.createproduct = async (req,res) => {
  

  const {pro_tipo,pro_categoria, pro_terceros, pro_nombre, pro_codigo,pro_descripcion, pro_precio,pro_unidad} =req.body;
    const newprod= {pro_tipo,pro_categoria, pro_terceros, pro_nombre, pro_codigo,pro_descripcion, pro_precio,pro_unidad}
    console.log(newprod)
    await pool.query('INSERT INTO productos set?', [newprod]);

    res.json({status: 'PRODUCTO registrado'})
}


/*Script : contiene todas las funciones que se ejecutan dentro de las 
rutas relacionadas con los productos (En construción.....)
*/
productoscontrolers.editproduct = async (req,res) => {
  const id  = req.params.id;
  const {pro_tipo,pro_categoria, pro_terceros, pro_nombre, pro_codigo,pro_descripcion, pro_precio,pro_unidad} =req.body;
  const newprod= {pro_tipo,pro_categoria, pro_terceros, pro_nombre, pro_codigo,pro_descripcion, pro_precio,pro_unidad}
  

   await pool.query('UPDATE productos set ? WHERE id=?', [newprod, id]);
    console.log(req.params.id)

    res.json({status: 'Producto editado'})

  
}

productoscontrolers.deleteproduct = async (req,res) => {
  const id  = req.params.id;
   
   await pool.query('DELETE FROM productos  WHERE id=?', [id]);
    console.log(req.params.id)

    res.json({status: 'producto eliminado'})

  
}
module.exports = productoscontrolers;