const pool = require('../database');


const sectorescontrollers = {};

sectorescontrollers.listcat = async (req, res) => {
  const respuesta = await pool.query('SELECT idsectores, sec_codigo , sec_nombre  FROM sectores');

  res.json(respuesta.rows)

}

sectorescontrollers.geticatbyid = async (req, res) => {
    const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT idsectores, sec_codigo , sec_nombre  FROM sectores WHERE idsectores=$1', [id]);

  res.json(respuesta.rows)


}

sectorescontrollers.createcat = async (req, res) => {

  const {sec_codigo , sec_nombre  } = req.body;
  console.log(req.body)
  await pool.query('INSERT INTO sectores (sec_codigo , sec_nombre ) VALUES($1, $2)', [sec_codigo , sec_nombre]);

  res.json({ mensaje: 'Sector Registrado' })
}

sectorescontrollers.editcat = async (req, res) => {
    const id = parseInt(req.params.id);
  const { sec_codigo , sec_nombre } = req.body;
  await pool.query('UPDATE sectores set sec_codigo=$1, sec_nombre=$2  WHERE idsectores=$3', [sec_codigo , sec_nombre , id]);
  res.json({ mensaje: 'Sector editado' })


}

sectorescontrollers.delete = async (req,res) => {
  const id = parseInt(req.params.id);

  let nulo= null
  await pool.query('UPDATE aportantes  SET sectores_idsectores =$1 WHERE sectores_idsectores = $2', [nulo,
  
    id
  ]);

  await pool.query('UPDATE responsables  SET aportantes_idaportantes =$1 FROM aportantes  WHERE responsables.aportantes_idaportantes=aportantes.idaportantes AND aportantes.sectores_idsectores IS NULL', [nulo]);
 
   await pool.query('DELETE FROM sectores WHERE idsectores=$1', [id]);
    
res.json({mensaje:'sector eliminado'})

}

module.exports = sectorescontrollers;
