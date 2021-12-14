import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Script3 from '../../../scripts/scripts3';
import EncTabla from '../../../comunes/EncTabla';
import Tabla from '../../../comunes/Tabla';
const cookies = new Cookies(); 
class estNomina extends Component {
    state = { rols:[], status: null, dato:"" };
    componentDidMount() {  }
    dato = (rols) => { this.setState({ rols }); }
    render() {
        if(cookies.get("idroles")!=="1"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/Sectores"/>;}
        const columnas = [
            { title: 'ID', field:'idc', sortable: true },
            { title: 'Código', field: 'sec_codigo', sortable: true },
            { title: 'Nombre', field: 'sec_nombre', sortable: true }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Sectores Estatales"/>
                <div className="am-mainpanel">
                    <div className="card pd-20 pd-sm-40">
                        <Script3 tabla="sectores" devuelvedatos={this.dato} />
                        <EncTabla titulo="Sectores Estatales" link="/crearsect" titulo2="Sectores estatales" />
                        <Tabla tabla="sectores" columnas={columnas} valores={this.state.rols} titulo="Sectores estatales" link="Editasect/" />
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default estNomina;