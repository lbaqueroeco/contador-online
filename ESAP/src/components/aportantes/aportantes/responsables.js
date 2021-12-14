import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import EncTabla from '../../../comunes/EncTabla';
import axios from 'axios';
import global from '../../../Global';
import Script3 from '../../../scripts/scripts3';
import Tabla from '../../../comunes/Tabla';

const cookies = new Cookies(); 
class clasificaAportantes extends Component {
    state = { rols:[], enti:[], status: null, idd:null };
    componentDidMount() { 
      this.idd=this.props.match.params.id;
      var tabla2="responsables/aportante/"+this.idd;
      this.setState({ idc:this.idc });

      axios.get(global.url + tabla2, global.autentica ).then((res) => {
          const rols = res.data;
          this.setState({ rols });
        });

      axios.get(global.url + "aportantes/" + this.idd, 
      global.autentica ).then((res) => {
          const enti = res.data;
          this.setState({ enti });
        });
    }
    dato = (rols) => { this.setState({ rols }); }
    render() {
        if(cookies.get("idroles")!=="1"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/responsables"/>;}
        const columnas = [
            { title: 'Nombre', field: 'res_nombre', sortable: true },
            { title: 'Identificación', field: 'res_identificacion', sortable: true },
            { title: 'Cargo', field: 'res_cargo', sortable: true },
            { title: 'Email', field: 'res_email', sortable: true },
            { title: 'Teléfono', field: 'res_telefono', sortable: true }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Responsables entidad aportante"/>
                <div className="am-mainpanel">
                    <div className="card pd-20 pd-sm-40"> 
                        <EncTabla titulo="Responsables entidad aportante" link={"/crearresp/"+this.state.idd} titulo2="Responsable" />
                        <Tabla tabla="responsables" columnas={columnas} valores={this.state.rols} titulo="Responsable" link="/Editaresp/" />
                    </div>
                </div>
                <div className="modal-footer">
                  {this.state.titulo2}
                <NavLink className="btn btn-secondary pd-x-20" to="/aportantes">Volver</NavLink>
                </div>

                <Footer></Footer>
            </div>
        );
    }
}
export default clasificaAportantes;