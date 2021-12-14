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
import Pais from '../../../helpers/paises';

const cookies = new Cookies(); 
class Territoriales extends Component {
    Departamento = React.createRef(); 
    state = { tabl: [], status: null, deps:[]};
    dato = (tabl) => { this.setState({ tabl }); }
    componentDidMount() {}
    render() {
        if(cookies.get("idroles")!=="1") { return <Redirect to="./"/>; }
        const columnas = [
            { title: 'País', field: 'pai_nombre', sortable: true },
            { title: 'Código', field:'ter_cod', sortable: true},
            { title: 'Territorial', field: 'ter_nombre', sortable: true },
            { title: 'Macrozona', field: 'ter_macrozona', sortable: true },
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Territoriales"/>
                <div className="am-mainpanel">
                    <div className="card pd-20 pd-sm-40">
                        <Pais devuelvedatos={this.dato}  /><br/>
                        <Script3 tabla="territoriales" devuelvedatos={this.dato} />
                        <EncTabla titulo="Territoriales" link="/Crearterr" titulo2="Territoriales" />
                        <Tabla tabla="territoriales" columnas={columnas} valores={this.state.tabl} titulo="Territoriales" link="Editaterr/" />
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Territoriales;