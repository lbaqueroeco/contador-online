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
class tiposEntidades extends Component {
    state = { rols:[], status: null, dato:"" };
    componentDidMount() {  }
    dato = (rols) => { this.setState({ rols }); }
    render() {
        if(cookies.get("idroles")!=="1"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/Tipos-entidades"/>;}
        const columnas = [
            { title: 'ID', field:'idc', sortable: true },
            { title: 'Código', field: 'tad_codigo', sortable: true },
            { title: 'Nombre', field: 'tad_descripcion', sortable: true }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Tipos Entidades"/>
                <div className="am-mainpanel">
                    <div className="card pd-20 pd-sm-40">
                        <Script3 tabla="tipoadscrita" devuelvedatos={this.dato} />
                        <EncTabla titulo="Tipos Entidades" link="/creartent" titulo2="Tipos Entidades" />
                        <Tabla tabla="tipoadscrita" columnas={columnas} valores={this.state.rols} titulo="Tipos Entidades" link="Editatent/" />
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default tiposEntidades;