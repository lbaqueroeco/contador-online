
const pool = require('../database');
const helpers = require('../lib/helpers');

const logtranscontrollers = {};

logtranscontrollers.listlog = async (req, res) => {
    const respuesta = await pool.query('SELECT idlog_transactions, log_transactions FROM log_transactions ');

    res.json(respuesta)

}

logtranscontrollers.getlogbyid = async (req, res) => {
    const id = req.params.id;
    const respuesta = await pool.query('SELECT idlog_transactions, log_transactions FROM log_transactions WHERE idlog_transactions=?', [id]);

    res.json(
        respuesta
    )


}

logtranscontrollers.editlog = async (req, res) => {
    const id = req.params.id;
    const { log_transactions, wse_token } = req.body;
    const editedlog = { log_transactions, wse_token };
    const existe = await helpers.verifyexist('log_transactions', 'idlog_transactions', id)
    if (existe) {

        await pool.query('UPDATE log_transactions set ? WHERE idlog_transactions=?', [editedlog, id]);

        res.json({ mensaje: 'Log de transacciones actualizado' })
    } else {



        res.json({ mensaje: 'el log de transacciones que quiere editar no existe' })
    }



}

logtranscontrollers.createlog = async (req, res) => {


    const { log_transactions, wse_token } = req.body;
    const newlog = { log_transactions, wse_token }
    const existe = await helpers.verifyexist('log_transactions', 'log_transactions', newlog.log_transactions)


    if (existe) {

        res.json({ mensaje: 'el log de transacciones ya existe' })
    }
    else {
        await pool.query('INSERT INTO log_transactions set?', [newlog]);

        res.json({ mensaje: 'log de transacciones registrado' })
    }
}



logtranscontrollers.deletelog = async (req, res) => {
    const id = req.params.id;
    const existe = await helpers.verifyexist('log_transactions', 'idlog_transactions', id)

    if (existe) {
        await pool.query('DELETE FROM log_transactions  WHERE idlog_transactions =?', [id]);


        res.json({ mensaje: 'log de transacciones eliminado' })
    } else {

        res.json({ mensaje: 'el log de transacciones no existe' })
    }
}
module.exports = logtranscontrollers;
