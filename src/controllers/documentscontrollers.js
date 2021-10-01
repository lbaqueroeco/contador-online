const pool = require('../database');
const multer =require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const helpers = require('../lib/helpers');

const documentscontrollers = {};



documentscontrollers.upload = async (req,res) => {
    const {filename, destination, path } = req.files.rut[0]
    const docdata = {
        filename,
        destination,
        path
    }

    filenamecrypt = await helpers.encryptdocs(docdata.filename)
    filedestcrypt = await helpers.encryptdocs(docdata.destination)
    filepathcrypt = await helpers.encryptdocs(docdata.path)
    
    console.log(filenamecrypt)
    console.log(filedestcrypt)
    console.log(filepathcrypt)
res.json({mensaje: 'documento cargado satisfactoriamente'})
}


module.exports = documentscontrollers;