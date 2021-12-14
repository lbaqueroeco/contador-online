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
import Ciudad from '../../../helpers/municipios';

const cookies = new Cookies(); 
class sedes extends Component {
    Ciudad = React.createRef(); 
    state = { tabl: [], status: null, deps:[]};
    dato = (tabl) => { this.setState({ tabl }); }
    componentDidMount() {}
    render() {
        if(cookies.get("idroles")!=="1") { return <Redirect to="./"/>; }
        const columnas = [
            { title: 'Territorial', field: 'ter_nombre', sortable: true },
            { title: 'Departamento', field: 'dep_nombre', sortable: true },
            { title: 'Municipio', field: 'ciu_nombre', sortable: true },
            { title: 'Código', field: 'sed_codigo', sortable: true },
            { title: 'Nombre', field:'sed_nombre', sortable: true},
            { title: 'Dirección', field: 'sed_direccion', sortable: true },
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <form  name="forma">
                <Titulo titulo="Sedes"/>
                <div className="am-mainpanel">
                    <div className="card pd-20 pd-sm-40">
                        <Ciudad devuelvedatos={this.dato}  /><br/>
                        <Script3 tabla="sedes" devuelvedatos={this.dato} />
                        <EncTabla titulo="Sedes" link="/Crearsede" titulo2="Sedes" />
                        <Tabla tabla="sedes" columnas={columnas} valores={this.state.tabl} titulo="Sedes" link="Editasede/" />
                    </div>
                </div>
                </form>
                <Footer></Footer>
            </div>
        );
    }
}
export default sedes;