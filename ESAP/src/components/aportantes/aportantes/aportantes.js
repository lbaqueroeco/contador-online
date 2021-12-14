import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import { Redirect, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import MaterialTable from 'material-table';
import definiciones from '../../../comunes/definiciones';
import Titulo from '../../../comunes/Titulo';
import FiltrosConsulta from '../comunes/filtrosConsultas';
import EncTabla from '../../../comunes/EncTabla';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
const cookies = new Cookies(); 

class aportanes extends Component {
    state = { tabe:[], status: null };
    componentDidMount() {}
    dato = (tabe) => { this.setState({ tabe });  }
    render() {
        if(!cookies.get("idroles")) { return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/aportantes"/>; }
        const columnas = [
          { title: 'Municipio', field:'ciu_nombre', sortable: true, width: "10%" },
          { title: 'Entidad', field:'apo_nombre', sortable: true, width: "15%" },
          { title: 'NIT', field:'apo_identificacion', sortable: true, width: "15%"},
          { title: 'Email', field:'apo_email', sortable: true, width: "15%"},
          { title: 'Celular', field:'apo_celular', sortable: true, width: "10%"},
          { title: 'Dirección', field:'apo_direccion', sortable: true, width: "20%"},
          { title: 'Responsables', field:'apo_ordenentidad', sortable: false, width: "10%",
            render: row =>  (<NavLink className="btn btn-primary" to={"/responsables/"+row["idaportantes"]}>Ver</NavLink>)
          }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Entidades aportanes"/>
                <div className="am-mainpanel">
                  <div className="card pd-20 pd-sm-40">
                    <EncTabla titulo="Aportantes" link="/Crearapor" titulo2="Aportantes" />
                    <FiltrosConsulta devuelvedatos={this.dato} titulo=''/>
                    <MaterialTable columns={columnas} data={this.state.tabe} title="Entidades aportantes"
                      actions={[
                      { icon: () => <Edit />, tooltip: 'Editar', onClick: (event, rowData)=>{document.location.href="/Editaapor/" + rowData.idaportantes} },
                      { icon: () => <DeleteOutline />, tooltip: 'Eliminar', onClick: (event, rowData)=>this.elimina(rowData.idaportantes) }
                      ]}
                      options={{ actionsColumnIndex: -1, rowStyle: { fontSize: 13,}}}
                      localization={{ header:{ actions: 'Acciones'}}}
                      icons={definiciones}
                    ></MaterialTable> 
                  </div>
              </div>
              <Footer></Footer>
            </div>
        );
    }
}
export default aportanes;