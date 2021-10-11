const pool = require('../database');
const multer =require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const helpers = require('../lib/helpers');

const documentscontrollers = {};



documentscontrollers.upload = async (req,res) => {
    const {filename, path } = req.files.rut[0]
    const docdata = {
        filename,
        path
    }
    filenamecrypt = await helpers.encryptdocs(docdata.filename)
    filepathcrypt = await helpers.encryptdocs(docdata.path)
    const newdocdata = {
        doc_nombre: filenamecrypt,
        doc_url:filepathcrypt
    }
    const result = await pool.query('INSERT INTO documentos set ? ', [newdocdata]);


res.json({mensaje: 'documento cargado satisfactoriamente'})
}

documentscontrollers.download = async (req,res) => {
    const respuesta = await pool.query('SELECT * FROM documentos ');
    console.log(respuesta)
    res.json(respuesta)



}

module.exports = documentscontrollers;