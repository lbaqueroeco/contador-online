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
const cookies = new Cookies(); 

class Crearmuni extends Component {
    state = { muni: {}, cons:[], status: null, idc:null };
    componentDidMount() {
        this.idc=this.props.match.params.id;
        this.setState({ idc:this.idc });
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = {
            "aportantes_idaportantes": this.state.idc, 
            "res_nombre": document.forma.Nombre.value, 
            "res_identificacion": document.forma.Identificacion.value, 
            "res_cargo": document.forma.Cargo.value, 
            "res_telefono": document.forma.Celular.value, 
            "res_email": document.forma.Email.value, 
        }
        guarda(tabe, "responsables", "Responsable entidad aportante");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/aportantes"/>; }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Agregar Responsable Entidad Aportante"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Responsable Entidad Aportante</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                    <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" />
                                    <Fila nombre="Identificación" refer="Identificacion" tipo="1" arreglo="" />
                                    <Fila nombre="Cargo" refer="Cargo" tipo="1" arreglo="" />
                                    <Fila nombre="Email" refer="Email" tipo="3" arreglo="" />
                                    <Fila nombre="Teléfono" refer="Celular" tipo="1" arreglo="" />
                                </div>
                                <Botones enlace='/aportantes'/>    
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
export default Crearmuni;