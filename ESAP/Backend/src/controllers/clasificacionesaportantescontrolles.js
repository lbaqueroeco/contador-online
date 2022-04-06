const pool = require('../database');


const clasificacionesaportantescontrolles = {};

clasificacionesaportantescontrolles.listcat = async (req, res) => {
  const respuesta = await pool.query('SELECT idclasificaaportantes, cla_codigo, cla_nombre FROM clasificaaportantes');

  res.json(respuesta.rows )

}

clasificacionesaportantescontrolles.geticatbyid = async (req, res) => {
    const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT idclasificaaportantes, cla_codigo, cla_nombre  FROM clasificaaportantes WHERE idclasificaaportantes=$1', [id]);

  res.json(respuesta.rows)


}

clasificacionesaportantescontrolles.createcat = async (req, res) => {

  const {cla_codigo, cla_nombre } = req.body;
  console.log(req.body)
  await pool.query('INSERT INTO clasificaaportantes (cla_codigo, cla_nombre) VALUES($1, $2)', [cla_codigo, cla_nombre]);

  res.json({ mensaje: 'Clsificación aportante  registrada' })
}

clasificacionesaportantescontrolles.editcat = async (req, res) => {
    const id = parseInt(req.params.id);
  const { cla_codigo, cla_nombre} = req.body;
  await pool.query('UPDATE clasificaaportantes set cla_codigo=$1, cla_nombre=$2 WHERE idclasificaaportantes=$3', [cla_codigo, cla_nombre, id]);
  res.json({ mensaje: 'Clsificación aportante editada' })


}

clasificacionesaportantescontrolles.delete = async (req,res) => {
  const id = parseInt(req.params.id);

  let nulo= null
  await pool.query('UPDATE aportantes  SET clasificaaportantes_idclasificaaportantes =$1 WHERE clasificaaportantes_idclasificaaportantes = $2', [nulo,
  
    id
  ]);

  await pool.query('UPDATE responsables  SET aportantes_idaportantes =$1 FROM aportantes  WHERE responsables.aportantes_idaportantes=aportantes.idaportantes AND aportantes.clasificaaportantes_idclasificaaportantes IS NULL', [nulo]);
 
   await pool.query('DELETE FROM clasificaaportantes WHERE idclasificaaportantes=$1', [id]);
    

   res.json({mensaje:'clasificacion aportante eliminada'})

}
    



module.exports = clasificacionesaportantescontrolles;
