import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { actualiza } from '../../../scripts/scripts';
import Script2 from '../../../scripts/scripts2';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies(); 

class Editaresp extends Component {
    idc = null;
    state = { tabe: {}, cons:[], status: null };
    componentDidMount() {
        this.idc=this.props.match.params.id;
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe1 = {
            "aportantes_idaportantes": document.forma.idapor.value, 
            "res_nombre": document.forma.Nombre.value, 
            "res_identificacion": document.forma.Identificacion.value, 
            "res_cargo": document.forma.Cargo.value, 
            "res_telefono": document.forma.Celular.value, 
            "res_email": document.forma.Email.value 
        }
        actualiza(tabe1, "responsables", "Responsable entidad aportante", this.idc);
        this.setState({ status: 'Ok'})
    }
    dato = (tabe) => { 
        this.setState(tabe);
        document.forma.Nombre.value=this.state[0].res_nombre; 
        document.forma.Email.value=this.state[0].res_email; 
        document.forma.Celular.value=this.state[0].res_telefono; 
        document.forma.Identificacion.value=this.state[0].res_identificacion; 
        document.forma.Cargo.value=this.state[0].res_cargo; 
        document.forma.idapor.value=this.state[0].idaportantes; 
    }

    render() {
        if(cookies.get("idroles")!=="1")
        { return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/aportantes"/>; }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Entidad Aportante"/>
                <Script2 id={this.props.match.params.id} tabla="responsables" devuelvedatos={this.dato} />
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Editar Responsable</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                    <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" />
                                    <Fila nombre="Identificación" refer="Identificacion" tipo="1" arreglo="" />
                                    <Fila nombre="Cargo" refer="Cargo" tipo="1" arreglo="" />
                                    <Fila nombre="Email" refer="Email" tipo="3" arreglo="" />
                                    <Fila nombre="Teléfono" refer="Celular" tipo="1" arreglo="" />
                                    <Fila nombre="" refer="idapor" tipo="10" arreglo="" />
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
export default Editaresp;