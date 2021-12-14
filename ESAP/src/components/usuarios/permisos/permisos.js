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
import Rol from '../../../helpers/roles';

const cookies = new Cookies(); 
class Permisos extends Component {
    Rol = React.createRef(); 
    state = { tabl: [], status: null, deps:[]};
    dato = (tabl) => { this.setState({ tabl }); }
    componentDidMount() {}
    render() {
        if(cookies.get("idroles")!=="1") { return <Redirect to="./"/>; }
        const columnas = [
            { title: 'Rol', field:'rol_nombre', sortable: true},
            { title: 'Menú', field: 'men_nombre', sortable: true },
            { title: 'Crear', field: 'per_crear', sortable: true },
            { title: 'Editar', field: 'per_editar', sortable: true },
            { title: 'Eliminar', field: 'per_eliminar', sortable: true },
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Permisos"/>
                <div className="am-mainpanel">
                    <div className="card pd-20 pd-sm-40">
                        <Rol devuelvedatos={this.dato}  />
                        <Script3 tabla="permisos" devuelvedatos={this.dato} /><br/>
                        <EncTabla titulo="Permisos" link="/Crearperm" titulo2="Permisos" />
                        <Tabla tabla="permisos" columnas={columnas} valores={this.state.tabl} titulo="Permisos" link="Editaperm/" />
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Permisos;