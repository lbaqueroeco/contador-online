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
import Territorial from '../../../helpers/territoriales';

const cookies = new Cookies(); 
class Departamento extends Component {
    Departamento = React.createRef(); 
    state = { tabl: [], status: null, deps:[]};
    dato = (tabl) => { this.setState({ tabl }); }
    componentDidMount() {}
    render() {
        if(cookies.get("idroles")!=="1") { return <Redirect to="./"/>; }
        const columnas = [
            { title: 'Territorial', field: 'ter_nombre', sortable: true },
            { title: 'Código', field:'dep_codigo', sortable: true},
            { title: 'Departamento', field: 'dep_nombre', sortable: true }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Departamentos"/>
                <div className="am-mainpanel">
                    <div className="card pd-20 pd-sm-40">
                        <Territorial devuelvedatos={this.dato}  /><br/>
                        <Script3 tabla="departamentos" devuelvedatos={this.dato} />
                        <EncTabla titulo="Departamentos" link="/Creardpto" titulo2="Departamentos" />
                        <Tabla tabla="departamentos" columnas={columnas} valores={this.state.tabl} titulo="Departamentos" link="Editadpto/" />
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Departamento;