import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import { Redirect } from 'react-router-dom';
import Titulo from '../../../comunes/Titulo';
import Script3 from '../../../scripts/scripts3';
import EncTabla from '../../../comunes/EncTabla';
import Tabla from '../../../comunes/Tabla';
const cookies = new Cookies(); 
class Usuarios extends Component {
    state = { usua: [], status: null, dato:"" };
    componentDidMount() {}
    dato = (usua) => { this.setState({ usua }); }
    render() {
        if(cookies.get("idroles")!=="1"){ return <Redirect to="./"/>; }
        const columnas = [
            { title: 'Rol', field:'rol_nombre', sortable: true },
            { title: 'Nombre', field: 'usu_nombre', sortable: true }, 
            { title: 'Email', field: 'usu_email', sortable: true },
            { title: 'Celular', field: 'usu_celular', sortable: true },
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Usuarios del sistema"/>
                <div className="am-mainpanel">
                    <div className="card pd-20 pd-sm-40">
                        <Script3 tabla="usuarios" devuelvedatos={this.dato} />
                        <EncTabla titulo="Usuarios del sistema" link="/crearusuario" titulo2="Usuario" />
                        <Tabla tabla="usuarios" columnas={columnas} valores={this.state.usua} titulo="Usuarios del sistema" link="Editausuario/" />
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Usuarios;