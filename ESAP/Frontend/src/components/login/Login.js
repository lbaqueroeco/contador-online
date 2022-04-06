import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import global from '../../Global'; 
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
        var correo=this.Email.current.value;
        var clave=this.Contrasena.current.value;
        axios.post(global.url + "auth/login/", {usu_email: correo, usu_password: clave})
        .then((res) => {
            var respuesta=res.data;
            var rsd=respuesta.result.usu_nombre.split(" ");
            var pn=rsd[0].substr(0,1)+rsd[1].substr(0,1);
            cookies.set("idusuarios", respuesta.result.idusuarios, {path:"/"});
            cookies.set("idroles", respuesta.result.iroles, {path:"/"});
            cookies.set("nombre", respuesta.result.usu_nombre, {path:"/"});
            cookies.set("inicial", pn, {path:"/"});
            cookies.set("token", respuesta.result.token, {path:"/"});
            cookies.set("usu_idmacrozona", respuesta.result.usu_idmacrozona, {path:"/"});
            cookies.set("usu_idterritorial", respuesta.result.usu_idterritorial, {path:"/"});
            cookies.set("revision", "No", {path:"/"});
            if(respuesta.result.aute==="Ok"){ this.setState({ status: 'Ok'}) }
            else {
                swal("Login incorrecto", "Usuarrio o password incorrecto", "error");
            }
        })
        .catch((error) => {
          swal("Login incorrecto", "Usuarrio o password incorrecto", "error");
          console.log(error);
        });
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
                            <p className="white titullog">ESAP - SIGIP</p>
                            <p className="white mb-0">
                                Sistema Integrado de Gestión de Ingresos Parafiscales<br/>
                            </p>
                        </div>
                        <div className="formside">
                            <h2 className="mb-4" style={{color:"#063970"}}>Ingreso</h2>
                            <form onSubmit={this.Login} name="forma">
                                <span>Usuario</span>
                                <label className="form-group has-float-label mb-4">
                                    <input className="form-control" ref={this.Email} type="email" />
                                </label>
                                <span>Contraseña</span>
                                <label className="form-group has-float-label mb-4">
                                    <input className="form-control" ref={this.Contrasena} type="password" placeholder="" />
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