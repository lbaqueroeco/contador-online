import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import ClasificaDocs from '../../../helpers/clasificadocs';
import { actualiza } from '../../../scripts/scripts';
import Script2 from '../../../scripts/scripts2';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 


class editatdoc extends Component {
    Rol = React.createRef(); 
    idc = null;
    state = { rols:[], status: null, dato:"", 
    apro: ["Aprobado", "Revisado, Aprobado", "Proyectado, Revisado, Aprobado"]};
    componentDidMount() { this.idc=this.props.match.params.id; }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = { 
            tid_nombre: document.forma.Codigo.value,
            tid_clasifica: document.forma.clas.value,
            tid_aprobacion: document.forma.aprob.value
        }
        actualiza(tabe, "tiposdocumentos", "Tipos de documentos", this.idc, "/Tipos-docuemntos");
        this.setState({ status: 'Ok'})
    }
    dato = (rols) => { 
        this.setState(rols);
        document.forma.Codigo.value=this.state[0].tid_nombre; 
        document.forma.clas.value=this.state[0].tid_clasifica; 
        document.forma.aprob.value=this.state[0].tid_aprobacion; 
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/Tipos-docuemntos"/>;}
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Tipos documentos"/>
                <div className="am-mainpanel">
                        <div className="card pd-20 pd-sm-40">
                          <Script2 id={this.props.match.params.id} tabla="tiposdocumentos" devuelvedatos={this.dato} />
                            <h6 className="card-body-title">Editar Tipos documentos</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                        <ClasificaDocs/>
                                        <Fila nombre="Tipo Documento" refer="Codigo" tipo="1" arreglo="" defecto={this.state.tid_nombre}  />
                                        <Fila nombre="Tipo aporbacion" refer="aprob" tipo="6" arreglo={this.state.apro} defecto={this.state.tid_aprobacion}  />
                                    </div>
                                    <Botones enlace='/Tipos-docuemntos'/>    
                                </div>
                            </form>
                        </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default editatdoc;