import React, { Component } from 'react';
import Roles from '../../../helpers/roles';
import Macrozonas from '../../../helpers/macrozonas';
import Territoriales from '../../../helpers/territoriales';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { actualiza } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Script2 from '../../../scripts/scripts2';

const cookies = new Cookies();

class editausuario extends Component {
    idc = null;
    state = { role:[], usua:[], status: null };
    componentDidMount() {
        this.idc=this.props.match.params.id;
    }
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
            "usu_idmacrozona":macr,
            "usu_idterritorial": terr
        }
        actualiza(tabe, "usuarios", "Usuario", this.idc, "/Usuarios");
        this.setState({ status: 'Ok'})
    }
    dato = (usua) => { 
        this.setState(usua); 
        document.forma.Nombre.value=this.state[0].usu_nombre; 
        document.forma.Email.value=this.state[0].usu_email; 
        document.forma.irol.value=this.state[0].roles_idroles; 
        document.forma.Celular.value=this.state[0].usu_celular; 
        document.forma.Desde.value=this.state[0].usu_fechainicio.substr(0,10); 
        document.forma.Hasta.value=this.state[0].usu_fechafin.substr(0,10); 
        var macr=this.state[0].usu_idmacrozona;
        if(macr===1){ macr="Macrozona I"; }
        else if(macr===2){ macr="Macrozona II"; }
        else if(macr===3){ macr="Macrozona III"; }
        document.forma.Macro.value=macr; 
        document.forma.idterritorial.value=this.state[0].usu_idterritorial; 
    }
    render() {
        if(cookies.get("idroles")!=="1"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/Usuarios"/>; }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Usuario"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Editar Usuario</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                    <Roles valor={this.state.idroles}/>
                                    <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" defecto={this.state.usu_nombre} id="" />
                                    <Fila nombre="Email" refer="Email" tipo="3" arreglo="" id="" defecto={this.state.usu_email} />
                                    <Fila nombre="Contraseña" refer="Password" tipo="4" arreglo="" id="" defecto="" />
                                    <Fila nombre="Celular" refer="Celular" tipo="1" arreglo="" id="" defecto={this.state.usu_telefono} />
                                    <Fila nombre="Activo desde" refer="Desde" tipo="7" arreglo="" id="" defecto={this.state.usu_telefono} />
                                    <Fila nombre="Activo hasta" refer="Hasta" tipo="7" arreglo="" id="" defecto={this.state.usu_telefono} />
                                    <Macrozonas />
                                    <Territoriales />
                                </div>
                                <Script2 id={this.props.match.params.id} tabla="usuarios" devuelvedatos={this.dato} />
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
export default editausuario;