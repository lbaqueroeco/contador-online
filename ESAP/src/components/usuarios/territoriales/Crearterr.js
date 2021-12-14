import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Pais from '../../../helpers/paises';
const cookies = new Cookies(); 

class Crearterr extends Component {
    state = {
        muni: {},
        cons:[],
        status: null
    };
    componentDidMount() {}
    guardar = (e) =>{
        e.preventDefault();
        const tabe = {
            "paises_idpaises": document.forma.idpais.value,
            "ter_cod": document.forma.Codigo.value,
            "ter_nombre": document.forma.Nombre.value,
            "ter_macrozona": document.forma.Macro.value,
        }
        guarda(tabe, "territoriales", "Territorial");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/territoriales"/>; }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Agregar Territorial"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Territorial</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                    <Pais valor={this.state.paises_idpaises}/>
                                    <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" />
                                    <Fila nombre="Terrirorial" refer="Nombre" tipo="1" arreglo="" />
                                    <Fila nombre="Macrozona" refer="Macro" tipo="1" arreglo="" />
                                </div>
                                <Botones enlace='/territoriales'/>    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Crearterr;