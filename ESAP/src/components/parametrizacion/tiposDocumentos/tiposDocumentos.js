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
class tiposDocumentos extends Component {
    state = { rols:[], status: null, dato:"" };
    componentDidMount() {  }
    dato = (rols) => { this.setState({ rols }); }
    render() {
        if(cookies.get("idroles")!=="1"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/Tipos-documentos"/>;}
        const columnas = [
            { title: 'ID', field:'idc', sortable: true },
            { title: 'Nombre', field: 'tid_nombre', sortable: true }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Tipos documentos"/>
                <div className="am-mainpanel">
                    <div className="card pd-20 pd-sm-40">
                        <Script3 tabla="tiposdocumentos" devuelvedatos={this.dato} />
                        <EncTabla titulo="Tipos documentos" link="/creartdoc" titulo2="Tipos documentos" />
                        <Tabla tabla="tiposdocumentos" columnas={columnas} valores={this.state.rols} titulo="Tipos documentos" link="Editatdoc/" />
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default tiposDocumentos;