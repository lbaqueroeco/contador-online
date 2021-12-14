import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import { Redirect, NavLink } from 'react-router-dom';
import Moment from 'react-moment';
import Cookies from 'universal-cookie';
import MaterialTable from 'material-table';
import definiciones from '../../../comunes/definiciones';
import Titulo from '../../../comunes/Titulo';
import FiltrosConsulta from '../comunes/filtrosConsultas';
const cookies = new Cookies(); 

class Consulta extends Component {
    FechaInicial = React.createRef(); 
    FechaFinal = React.createRef(); 
    Estado = React.createRef(); 
    state = { tabe:[], status: null };
    componentDidMount() {}
    dato = (tabe) => { this.setState({ tabe }); console.log(tabe); }
    render() {
        if(!cookies.get("idroles")) { return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/Radicacion"/>; }
        const columnas = [
          { title: 'Nombre', field:'per_primernombre', sortable: true},
          { title: 'Apellido', field:'per_primerapellido', sortable: true},
          { title: 'Identificación', field:'per_numeroid', sortable: true},
          { title: 'Tipo de siniestro', field:'sin_tipoatep', sortable: true},
          { title: 'Fecha', field:'sin_fecha', sortable: true, type: 'date', render: row => <Moment format="DD MMM YYYY">{ row["sin_fecha"]}</Moment>},
          { title: 'Estado', field:'sin_estado', sortable: true ,render: row => row["sin_estado"]==='RESERVADO'? (<div className="amarillo">{ row["sin_estado"] }</div>)
            : row["sin_estado"]==='OBJETADO' ? ( <div className="rojo">{row["sin_estado"]}</div> )  
            : row["sin_estado"]==='ACEPTADO' ? ( <div className="verde">{row["sin_estado"]}</div> )
            : (row["sin_estado"])
          },
          { title: 'Reporte', field:'sin_tipoatep', sortable: true,
            render: row => row["sin_tipoatep"]==='FURAT'? (<NavLink to={"/furat/"+row["idreportes"]}>Ver informe</NavLink>)
            : (<NavLink to={"/furel/"+row["idreportes"]}>Ver informe</NavLink>)
          }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Consulta de siniestros"/>
                <div className="am-mainpanel">
                  <div className="card pd-20 pd-sm-40">
                    <FiltrosConsulta devuelvedatos={this.dato} titulo='Consulta'/>
                    <MaterialTable columns={columnas} data={this.state.tabe} title="Consulta de siniestros" options={{ actionsColumnIndex: -1 }} icons={definiciones}></MaterialTable>
                  </div>
              </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Consulta;