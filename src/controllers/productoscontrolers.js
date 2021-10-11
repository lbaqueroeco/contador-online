const pool = require('../database');
const helpers = require('../lib/helpers');


const productoscontrolers = {};

productoscontrolers.listproduct = async (req,res) => {
  const respuesta = await pool.query('SELECT 	p.idproductos, tp.tip_nombre, cat.cat_nombre, ter.ter_identificacion, ter.ter_nombre, p.pro_nombre, p.pro_codigo, p.pro_descripcion, p.pro_precio, p.pro_unidad FROM terceros ter INNER JOIN productos p ON p.pro_terceros=ter.idterceros INNER JOIN categoria cat ON  cat.idcategorias=p.pro_categoria INNER JOIN tiposproducto tp ON tp.idtiposproducto=p.pro_tipo');
   
  res.json(respuesta)

}

productoscontrolers.getprodbyid = async (req,res) => {
  const id  = req.params.id;
  const respuesta = await pool.query('SELECT 	p.idproductos, tp.tip_nombre, cat.cat_nombre, ter.ter_identificacion, ter.ter_nombre, p.pro_nombre, p.pro_codigo, p.pro_descripcion, p.pro_precio, p.pro_unidad FROM terceros ter INNER JOIN productos p ON p.pro_terceros=ter.idterceros INNER JOIN categoria cat ON  cat.idcategorias=p.pro_categoria INNER JOIN tiposproducto tp ON tp.idtiposproducto=p.pro_tipo WHERE idproductos=?',[id]);
 
res.json( respuesta)
}

// listar productos por categoria

productoscontrolers.getprodbycat = async (req,res) => {
  const id  = req.params.id;
  const respuesta = await pool.query('SELECT 	p.idproductos, tp.tip_nombre, cat.cat_nombre, ter.ter_identificacion, ter.ter_nombre, p.pro_nombre, p.pro_codigo, p.pro_descripcion, p.pro_precio, p.pro_unidad FROM terceros ter INNER JOIN productos p ON p.pro_terceros=ter.idterceros INNER JOIN categoria cat ON  cat.idcategorias=p.pro_categoria INNER JOIN tiposproducto tp ON tp.idtiposproducto=p.pro_tipo WHERE cat.idcategorias=?',[id]);
 
res.json(respuesta)
}

// listar productos por tipo

productoscontrolers.getprodbytipo = async (req,res) => {
  const id  = req.params.id;
  const respuesta = await pool.query('SELECT 	p.idproductos, tp.tip_nombre, cat.cat_nombre, ter.ter_identificacion, ter.ter_nombre, p.pro_nombre, p.pro_codigo, p.pro_descripcion, p.pro_precio, p.pro_unidad FROM terceros ter INNER JOIN productos p ON p.pro_terceros=ter.idterceros INNER JOIN categoria cat ON  cat.idcategorias=p.pro_categoria INNER JOIN tiposproducto tp ON tp.idtiposproducto=p.pro_tipo WHERE tp.idtiposproducto=?',[id]);
 
res.json(respuesta)
}

// listar productos por tercero

productoscontrolers.getprodbyter = async (req,res) => {
  const id  = req.params.id;
  const respuesta = await pool.query('SELECT 	p.idproductos, tp.tip_nombre, cat.cat_nombre, ter.ter_identificacion, ter.ter_nombre, p.pro_nombre, p.pro_codigo, p.pro_descripcion, p.pro_precio, p.pro_unidad FROM terceros ter INNER JOIN productos p ON p.pro_terceros=ter.idterceros INNER JOIN categoria cat ON  cat.idcategorias=p.pro_categoria INNER JOIN tiposproducto tp ON tp.idtiposproducto=p.pro_tipo WHERE ter.idterceros=?',[id]);
 
res.json(respuesta)
}

// listar productos por ciudad de tercero
productoscontrolers.getprodbyciuter = async (req,res) => {
  const id  = req.params.id; 
  const respuesta = await pool.query('SELECT  p.idproductos, ciu.ciu_nombre, tp.tip_nombre, cat.cat_nombre, ter.ter_identificacion, ter.ter_nombre, p.pro_nombre, p.pro_codigo, p.pro_descripcion, p.pro_precio, p.pro_unidad FROM ciudades ciu INNER JOIN terceros ter ON  ciu.idciudades= ter.ter_ciudad INNER JOIN productos p ON p.pro_terceros=ter.idterceros INNER JOIN categoria cat ON  cat.idcategorias=p.pro_categoria INNER JOIN tiposproducto tp ON tp.idtiposproducto=p.pro_tipo WHERE ciu.idciudades=?',[id]);
 
res.json(respuesta)
}

// listar producto por departamento de terceros

productoscontrolers.getprodbydepter = async (req,res) => {
  const id  = req.params.id; 
  const respuesta = await pool.query('SELECT  p.idproductos, ciu.ciu_nombre, dep.dep_nombre, tp.tip_nombre, cat.cat_nombre, ter.ter_identificacion, ter.ter_nombre, p.pro_nombre, p.pro_codigo, p.pro_descripcion, p.pro_precio, p.pro_unidad FROM departamentos dep INNER JOIN ciudades ciu ON dep.iddepartamentos=ciu.ciu_iddepartamento INNER JOIN terceros ter ON  ciu.idciudades= ter.ter_ciudad INNER JOIN productos p ON p.pro_terceros=ter.idterceros INNER JOIN categoria cat ON  cat.idcategorias=p.pro_categoria INNER JOIN tiposproducto tp ON tp.idtiposproducto=p.pro_tipo WHERE dep.iddepartamentos=?',[id]);
 
res.json(respuesta)
}

// listar productos por ciudad de x categoria

productoscontrolers.getprodbyciucat= async (req,res) => {
  const ciucat  = req.query;
 const ciu = ciucat.ciu;
 const cat = ciucat.cat;
 
  const respuesta = await pool.query('SELECT  p.idproductos, ciu.ciu_nombre, tp.tip_nombre, cat.cat_nombre, ter.ter_identificacion, ter.ter_nombre, p.pro_nombre, p.pro_codigo, p.pro_descripcion, p.pro_precio, p.pro_unidad FROM ciudades ciu INNER JOIN terceros ter ON  ciu.idciudades= ter.ter_ciudad INNER JOIN clientes cl ON cl.cli_ciudad=ciu.idciudades INNER JOIN productos p ON p.pro_terceros=ter.idterceros INNER JOIN categoria cat ON  cat.idcategorias=p.pro_categoria INNER JOIN tiposproducto tp ON tp.idtiposproducto=p.pro_tipo WHERE ciu.idciudades=? AND cat.idcategorias=?',[ciu,cat]);
 //console.log(ciucat)
 //console.log(ciucat.ciu)
 //console.log(ciucat.cat)
res.json(respuesta)
}

// crear producto

productoscontrolers.createproduct = async (req,res) => {
  

  const {pro_tipo,pro_categoria, pro_terceros, pro_nombre, pro_codigo,pro_descripcion, pro_precio,pro_unidad} =req.body;
    const newprod= {pro_tipo,pro_categoria, pro_terceros, pro_nombre, pro_codigo,pro_descripcion, pro_precio,pro_unidad}
    console.log(newprod)
    const existecat = await helpers.verifyexist('categoria', 'idcategorias', newprod.pro_categoria)
    const existetipo = await helpers.verifyexist('tiposproducto', 'idtiposproducto', newprod.pro_tipo)
    const existeter = await helpers.verifyexist('terceros', 'idterceros', newprod.pro_terceros)
    if(existecat){
      if(existetipo){
        if(existeter){
          await pool.query('INSERT INTO productos set?', [newprod]);
          res.json({mensaje: 'PRODUCTO registrado'})
        }else{
          res.json({mensaje: 'No existe un tercero para el producto que desea registrar'})
        }
        
      }else{
      res.json({mensaje: 'No existe un tipo de producto para el producto que desea registrar'})

      }
      
     
    }else{
      res.json({mensaje: 'No existe una categoria para el producto que desea registrar'})
    }
   
}

productoscontrolers.editproduct = async (req,res) => {
  const id  = req.params.id;
  const {pro_tipo,pro_categoria, pro_terceros, pro_nombre, pro_codigo,pro_descripcion, pro_precio,pro_unidad} =req.body;
  const editedprod= {pro_tipo,pro_categoria, pro_terceros, pro_nombre, pro_codigo,pro_descripcion, pro_precio,pro_unidad}
  const existe = await helpers.verifyexist('productos', 'idproductos', id)
  const existecat = await helpers.verifyexist('categoria', 'idcategorias', editedprod.pro_categoria)
    const existetipo = await helpers.verifyexist('tiposproducto', 'idtiposproducto', editedprod.pro_tipo)
    const existeter = await helpers.verifyexist('terceros', 'idterceros', editedprod.pro_terceros)
if(existe){
    if(existecat){
      if(existetipo){
        if(existeter){
  await pool.query('UPDATE productos set ? WHERE idproductos=?', [editedprod, id])

  res.json({mensaje: 'Producto editado'})
        }else{
          res.json({mensaje: 'no existe este tercero para el producto que desea editar'})
        }
       

      }else{
        res.json({mensaje: 'no existe este tipo de producto para el producto que desea editar'})
      }

      
    }else{
      res.json({mensaje: 'no existe esta categoria para el producto que desea editar'})
    }
}else{
  res.json({mensaje: 'el producto que quiere editar no existe'})
}

  
}

productoscontrolers.deleteproduct = async (req,res) => {
  const id  = req.params.id;
   
   
    console.log(req.params.id)

    res.json({status: 'producto eliminado'})

  
}
module.exports = productoscontrolers;