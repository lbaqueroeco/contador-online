import React, { Component } from 'react';
//import axios from 'axios';
//import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
//import global from '../../Global'; 
import Cookies from 'universal-cookie';
import '../../assets/css/Dashboard.css';
//import fondo from "../../assets/images/fondo-esap.jpeg";

import '../../assets/css/bootstrap.min.css';
import '../../assets/css/bootstrap.rtl.only.min.css';
import '../../assets/css/bootstrap-float-label.min.css';
import '../../assets/css/main.css';

const cookies = new Cookies(); 

class Login extends Component {
    Email = React.createRef(); 
    Contrasena = React.createRef(); 
    state = {
        status: null,
        correo: "",
        clave: "",
    };
    Login = (e) => {
        e.preventDefault();
//        var correo=this.Email.current.value;
//        var clave=this.Contrasena.current.value;

        cookies.set("idusuarios", "1", {path:"/"});
        cookies.set("idroles", "1", {path:"/"});
        cookies.set("nombre", "Lucas", {path:"/"});
        cookies.set("token", "123456", {path:"/"});
        this.setState({ status: 'Ok'})


/*
        axios.post(global.url + "users/login/", {email: correo, password: clave}).then((res) => {
            var respuesta=res.data;
            cookies.set("idusuarios", respuesta.idusuarios, {path:"/"});
            cookies.set("idroles", respuesta.idroles, {path:"/"});
            cookies.set("nombre", respuesta.nombre, {path:"/"});
            cookies.set("token", respuesta.token, {path:"/"});
            this.setState({ status: 'Ok'})
        })
        .catch((error) => {
          swal("Login incorrecto", "Usuarrio o password incorrecto", "error");
          console.log(error);
        });*/

    }
    componentDidMount(){
      cookies.remove("idusuarios");
      cookies.remove("idroles");
      cookies.remove("nombre");
    }
    render() { 
        if(this.state.status==="Ok"){
            return <Redirect to="/Inicio"/>;
        }
        else {}
        return (
            <div className="back">
    <div className="fixed-background"></div>
    <main>
        <div className="container">
            <div className="row h-100">
                <div className="col-12 col-md-10 mx-auto my-auto">
                    <div className="card auth-card cardlogin">
                        <div className="position-relative imgside ">

                            <p className="white titullog">SOFTWARE APORTANTES</p>

                            <p className="white mb-0">
                                Gestion de la información de los
                                <br/>ingresos de la ley 21 de 1982.
                            </p>
                        </div>
                        <div className="formside">
                            <p className="mb-4">Ingreso</p>
                            <form onSubmit={this.Login} name="forma">
                                <label className="form-group has-float-label mb-4">
                                    <input className="form-control" ref={this.Email} type="email" />
                                    <span>E-mail</span>
                                </label>
                                <label className="form-group has-float-label mb-4">
                                    <input className="form-control" ref={this.Contrasena} type="password" placeholder="" />
                                    <span>Contraseña</span>
                                </label>
                                <div className="d-flex dere">
                                    <input className="botonlogin" type="submit" value="Entrar"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>


        );
    }
}
export default Login;