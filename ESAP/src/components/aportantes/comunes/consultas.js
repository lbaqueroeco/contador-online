import axios from 'axios';
import global from '../../Global';

export var consultas = (fec1, fec2, esta) => {
    if(fec1===""){ fec1 = new Date().toJSON().slice(0,4).replace(/-/g,'-')+"-01-01"; }
    if(fec2===""){ fec2 = new Date().toJSON().slice(0,4).replace(/-/g,'-')+"-12-31"; }
    if(esta===""){ esta="RESERVADO"; }
    axios.get(global.url + "vista_siniestros/Consulta_estado/"+esta+"/"+fec1+"/"+fec2+"/1", 
    global.autentica ).then((res) => {
        var tabe = res.data;
        console.log("1", tabe);
        return tabe;
    });
}