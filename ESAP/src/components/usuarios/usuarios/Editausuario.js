import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { actualiza } from '../../../scripts/scripts';
import Script2 from '../../../scripts/scripts2';
import Roles from '../../../helpers/roles';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Editausuario extends Component {
    idc = null;
    state = { role:[], usua:[], status: null };
    componentDidMount() {
        this.idc=this.props.match.params.id;
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = {
//            "idusuarios": this.idc,
            "roles_idroles": document.forma.irol.value,
            "usu_nombre": document.forma.Nombre.value,
            "usu_email": document.forma.Email.value,
            "usu_celular": document.forma.Celular.value,
            "usu_usuario": document.forma.Email.value,
            "usu_password": document.forma.Password.value,
        }
        console.log(tabe);
        actualiza(tabe, "usuarios", "Usuario", this.idc);
        this.setState({ status: 'Ok'})
    }
    dato = (usua) => { 
        this.setState(usua); 
        document.forma.Nombre.value=this.state[0].usu_nombre; 
        document.forma.Email.value=this.state[0].usu_email; 
        document.forma.irol.value=this.state[0].roles_idroles; 
        document.forma.Celular.value=this.state[0].usu_celular; 
    }
    render() {
        if(cookies.get("idroles")!=="1")
        {
            return <Redirect to="./"/>;
        }
        if(this.state.status==="Ok"){
            return <Redirect to="/Usuarios"/>;
        }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Usuario"/>
                <Script2 id={this.props.match.params.id} tabla="usuarios" devuelvedatos={this.dato} />
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
export default Editausuario;