const multer =require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const documents = {};

const storage = multer.diskStorage({
    destination: path.join('uploads'),
    filename:(req,file,cb) =>{
        cb(null,uuidv4()+ path.extname(file.originalname));
    }
})

documents.storagesingle = multer({
    storage: storage,
    dest: ('uploads'),
    limits:(fileSize=1000000)
  }).fields([{
    name: 'rut', maxCount: 1     //poner los nombres de cada archivo que se quiere recibir
  }, 
  {
    name: 'cedula', maxCount: 1
  }
  
  
  ]);

  
module.exports = documents;