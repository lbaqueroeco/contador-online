const pool = require('../database');
const tiposdocumentoscontrollers = {};

tiposdocumentoscontrollers.listcat = async (req, res) => {
  const respuesta = await pool.query('SELECT idtiposdocumentos, tid_nombre, tid_clasifica, tid_aprobacion FROM tiposdocumentos');
  res.json(respuesta.rows )
}

tiposdocumentoscontrollers.geticatbyid = async (req, res) => {
  const id = parseInt(req.params.id);
  const respuesta = await pool.query('SELECT idtiposdocumentos, tid_nombre, tid_clasifica, tid_aprobacion FROM tiposdocumentos WHERE idtiposdocumentos=$1', [id]);
  res.json(respuesta.rows)
}

tiposdocumentoscontrollers.createcat = async (req, res) => {
  const {tid_nombre, tid_clasifica, tid_aprobacion} = req.body;
  console.log(req.body)
  try{
    await pool.query('INSERT INTO tiposdocumentos (tid_nombre, tid_clasifica, tid_aprobacion) VALUES($1, $2, $3)', [tid_nombre, tid_clasifica, tid_aprobacion]);
    res.json({ mensaje: 'Tipo Documento Registrado' })
  }
  catch(error){
      console.log(error);
      res.json({mensaje: "CAMPOS NO VALIDOS"})
  }
}

tiposdocumentoscontrollers.editcat = async (req, res) => {
  const id = parseInt(req.params.id);
  try{
    const {tid_nombre, tid_clasifica, tid_aprobacion} = req.body;
    await pool.query('UPDATE tiposdocumentos set tid_nombre=$1, tid_clasifica=$2, tid_aprobacion=$3 WHERE idtiposdocumentos=$4', [tid_nombre, tid_clasifica, tid_aprobacion, id]);
    res.json({ mensaje: 'Tipo documento Editado' })
  }
  catch(error){
      console.log(error);
      res.json({mensaje: "CAMPOS NO VALIDOS"})
  }
}

tiposdocumentoscontrollers.delete = async (req,res) => {
  const id = parseInt(req.params.id);
  let nulo= null
  await pool.query('UPDATE documentosaportantes SET tiposdocumentos_idtiposdocumentos =$1 WHERE tiposdocumentos_idtiposdocumentos = $2', [nulo,id]);
  await pool.query('DELETE FROM tiposdocumentos WHERE idtiposdocumentos=$1', [id]);    
  res.json({mensaje:'tipo documento eliminado'})
}
module.exports = tiposdocumentoscontrollers;
