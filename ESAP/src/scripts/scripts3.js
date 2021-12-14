import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
class Script3 extends Component {
    state = { tabla:"" };
    componentDidMount(){  this.marcar(); }
    marcar = () => {
        var tabla = this.props.tabla;
        console.log(tabla);
        axios.get(global.url + tabla + "", global.autentica)
        .then(res => {
            var table = tabla.split("/");
            tabla=table[0];
    
            var rols = res.data;
            console.log(rols);
            rols = rols.map( item => { 
                if(tabla==="roles"){ 
                    return {  idc: item.idroles, rol_nombre : item.rol_nombre }; 
                }
                else if(tabla==="usuarios")
                {
                    return {  idc:item.idusuarios, rol_nombre:item.rol_nombre, usu_nombre:item.usu_nombre, usu_email:item.usu_email, usu_celular:item.usu_celular }; 
                }
                else if(tabla==="menus")
                {
                    return {  idc:item.idmenus, men_nombre:item.men_nombre, men_ruta:item.men_ruta, men_orden:item.men_orden, men_categoria:item.men_categoria }; 
                }
                else if(tabla==="permisos")
                {
                    return {  idc:item.idpermisos, men_nombre:item.men_nombre, rol_nombre:item.rol_nombre, per_crear:item.per_crear, per_editar:item.per_editar, per_eliminar:item.per_eliminar }; 
                }
                else if(tabla==="paises")
                {
                    return { idc:item.idpaises, pai_codigo:item.pai_codigo, pai_nombre:item.pai_nombre}; 
                }
                else if(tabla==="territoriales")
                {
                    return { idc:item.idterritorial, pai_nombre:item.pai_nombre, ter_cod:item.ter_cod, ter_nombre:item.ter_nombre, ter_macrozona:item.ter_macrozona}; 
                }
                else if(tabla==="departamentos")
                {
                    return { idc:item.iddepartamentos, ter_nombre:item.ter_nombre, dep_codigo:item.dep_codigo, dep_nombre:item.dep_nombre}; 
                }
                else if(tabla==="ciudades")
                {
                    return { idc:item.idciudades, ciu_codigo:item.ciu_codigo, dep_nombre:item.dep_nombre, ciu_nombre:item.ciu_nombre}; 
                }
                else if(tabla==="estructuranomnina")
                {
                    return { idc:item.idestructuranomina, est_codigo:item.est_codigo, est_nombre:item.est_nombre}; 
                }
                else if(tabla==="clasificacionesaportantes")
                {
                    return { idc:item.idclasificaaportantes, cla_codigo:item.cla_codigo, cla_nombre:item.cla_nombre}; 
                }
                else if(tabla==="tipoadscrita")
                {
                    return { idc:item.idtipoadscrita, tad_codigo:item.tad_codigo, tad_descripcion:item.tad_descripcion}; 
                }
                else if(tabla==="tiposdocumentos")
                {
                    return { idc:item.idtiposdocumentos, tid_nombre:item.tid_nombre}; 
                }
                else if(tabla==="sectores")
                {
                    return { idc:item.idsectores, sec_codigo:item.sec_codigo, sec_nombre:item.sec_nombre}; 
                }
                else if(tabla==="sedes")
                {
                    return { idc:item.idsedes, ter_nombre:item.ter_nombre, dep_nombre:item.dep_nombre, ciu_nombre:item.ciu_nombre, sed_codigo:item.sed_codigo, sed_nombre:item.sed_nombre, sed_direccion:item.sed_direccion}; 
                }
                else if(tabla==="responsables")
                {
                    return { idc:item.idresponsables, res_nombre:item.res_nombre, res_identificacion:item.res_identificacion, 
                    res_cargo:item.res_cargo, res_email:item.res_email, res_telefono:item.res_telefono}; 
                }
                else {
                    return {  idc: item.idroles, rol_nombre : item.rol_nombre }; 
                }
            });
            this.props.devuelvedatos(rols);
        });
    }
    render() { 
        return( <div></div>) 
    }
}
export default Script3;