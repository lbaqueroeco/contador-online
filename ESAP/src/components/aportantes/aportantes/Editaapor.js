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
import Departamento from '../../../helpers/municipios';
import Paramsaporta from '../../../helpers/aportantesfil';

const cookies = new Cookies(); 

class Crearmuni extends Component {
    idc = null;
    state = { tabe: {}, cons:[], status: null };
    componentDidMount() {
        this.idc=this.props.match.params.id;
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe1 = {
            "apo_nombre": document.forma.Nombre.value, 
            "apo_email": document.forma.Email.value, 
            "apo_celular": document.forma.Celular.value, 
            "apo_identificacion": document.forma.Identificacion.value, 
            "apo_sufijo": document.forma.Sufijo.value, 
            "apo_direccion": document.forma.Direccion.value, 
            "apo_fax": document.forma.Fax.value, 
            "apo_tipoidentificacion": document.forma.Tippoi.value, 
            "apo_firma": document.forma.Firma.value, 
            "apo_ordenentidad": "33", 
            "apo_tipoaportante": "332", 
            "estructuranomina_idestructuranomina": document.forma.estn.value, 
            "clasificaaportantes_idclasificaaportantes": document.forma.clap.value, 
            "sectores_idsectores": document.forma.sect.value, 
            "ciudades_idciudades": document.forma.Municipio.value, 
            "tipoadscrita_idtipoadscrita": document.forma.tiad.value
        }
        actualiza(tabe1, "aportantes", "Entidad Aportante", this.idc);
        this.setState({ status: 'Ok'})
    }
    dato = (tabe) => { 
        this.setState(tabe);
        document.forma.Departamento.value=this.state[0].iddepartamentos;
        document.forma.Municipio.value=this.state[0].idciudades;


        document.forma.clap.value=this.state[0].idclasificaaportantes;
        document.forma.estn.value=this.state[0].idestructuranomina;
        document.forma.sect.value=this.state[0].idsectores;
        document.forma.tiad.value=this.state[0].idtipoadscrita;

        document.forma.Nombre.value=this.state[0].apo_nombre; 
        document.forma.Email.value=this.state[0].apo_email; 
        document.forma.Celular.value=this.state[0].apo_celular; 
        document.forma.Identificacion.value=this.state[0].apo_identificacion; 
        document.forma.Sufijo.value=this.state[0].apo_sufijo; 
        document.forma.Direccion.value=this.state[0].apo_direccion; 
        document.forma.Fax.value=this.state[0].apo_fax; 
        document.forma.Tippoi.value=this.state[0].apo_tipoidentificacion; 
        document.forma.Firma.value=this.state[0].apo_firma; 
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
                <Script2 id={this.props.match.params.id} tabla="aportantes" devuelvedatos={this.dato} />
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Editar Municipio</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                    <Departamento valor={this.state.iddepartamentos}/>
                                    <Paramsaporta valor1="" valor2="" valor3="" valor4="" />
                                    <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" />
                                    <Fila nombre="Email" refer="Email" tipo="3" arreglo="" />
                                    <Fila nombre="Celular" refer="Celular" tipo="1" arreglo="" />
                                    <Fila nombre="Identificación" refer="Identificacion" tipo="1" arreglo="" />
                                    <Fila nombre="Sufijo" refer="Sufijo" tipo="1" arreglo="" />
                                    <Fila nombre="Dirección" refer="Direccion" tipo="1" arreglo="" />
                                    <Fila nombre="Fax" refer="Fax" tipo="1" arreglo="" />
                                    <Fila nombre="Tipo identificación" refer="Tippoi" tipo="1" arreglo="" />
                                    <Fila nombre="Firma" refer="Firma" tipo="1" arreglo="" />
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