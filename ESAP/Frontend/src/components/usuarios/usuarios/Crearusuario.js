import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import Roles from '../../../helpers/roles';
import Macrozonas from '../../../helpers/macrozonas';
import Territoriales from '../../../helpers/territoriales';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Creaarrol extends Component {
    state = { usuas: {}, role:[], status: null };
    componentDidMount() { }
    guardar = (e) =>{
        e.preventDefault();
        var macr = document.forma.Macro.value;
        if(macr===""){ macr="0"; }
        else if(macr==="Macrozona I"){ macr="1"; }
        else if(macr==="Macrozona II"){ macr="2"; }
        else if(macr==="Macrozona III"){ macr="3"; }
        var terr = document.forma.idterritorial.value;
        if(terr===""){ terr="0"; }
        const tabe = {
            "roles_idroles": document.forma.irol.value,
            "usu_nombre": document.forma.Nombre.value,
            "usu_email": document.forma.Email.value,
            "usu_celular": document.forma.Celular.value,
            "usu_usuario": document.forma.Email.value,
            "usu_password": document.forma.Password.value,
            "usu_fechainicio": document.forma.Desde.value,
            "usu_fechafin": document.forma.Hasta.value,
            "usu_idmacrozona": macr,
            "usu_idterritorial": terr,
        }
        guarda(tabe, "auth/registro", "Usuario", "/Usuarios");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/Usuarios"/>; }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Agregar Usuario"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Usuario</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                        <Roles valor=""/>
                                        <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" defecto={this.state.usu_nombre} id="" />
                                        <Fila nombre="Email" refer="Email" tipo="3" arreglo="" id="" defecto={this.state.usu_email} />
                                        <Fila nombre="Contraseña" refer="Password" tipo="4" arreglo="" id="" defecto="" />
                                        <Fila nombre="Celular" refer="Celular" tipo="1" arreglo="" id="" defecto={this.state.usu_telefono} />
                                        <Fila nombre="Activo desde" refer="Desde" tipo="7" arreglo="" id="" defecto={this.state.usu_telefono} />
                                        <Fila nombre="Activo hasta" refer="Hasta" tipo="7" arreglo="" id="" defecto={this.state.usu_telefono} />
                                        <Macrozonas />
                                        <Territoriales />
                                    </div>
                                    <Botones enlace='/Usuarios'/>    
                                </div> 
                            </form>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Creaarrol;