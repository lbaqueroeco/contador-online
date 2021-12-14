import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import { Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import swal from 'sweetalert';
import axios from 'axios';
import Cookies from 'universal-cookie';
import MaterialTable from 'material-table';
import definiciones from '../../../comunes/definiciones';
import Titulo from '../../../comunes/Titulo';
import FiltrosConsulta from '../comunes/filtrosConsultas';
import global from '../../../Global';
const cookies = new Cookies(); 

class Evaluacion extends Component {
    FechaInicial = React.createRef(); 
    FechaFinal = React.createRef(); 
    Estado = React.createRef(); 
    state = { tabe:[], status: null };
    componentDidMount() {}
    cambio_estado (id, estado) {
      swal({
          title: "Está seguro?", text: "Una vez cambie el estado no podrá recuperarlo!", icon: "warning",
          buttons: true, dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            var usu = cookies.get("idusuarios");
            axios.put(global.url + "reportes/Estado/" + id + "/" + estado + "/obs/" + usu,
            global.autentica).then((res) => {
              swal("Se ha actualizado el estado a "+ estado , "Se ha actualizado el esatado de siniestro", "success");
              <Redirect to="./Evaluacion"/>;
            });
          } else {
            swal("Se ha cancelado el cambio de estado");
          }
        });
    }
    dato = (tabe) => { this.setState({ tabe }); }
    render() {
        if(!cookies.get("idroles")) { return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/Radicacion"/>; }
        const columnas = [
          { title: 'Nombre', field:'per_primernombre', sortable: true},
          { title: 'Apellido', field:'per_primerapellido', sortable: true},
          { title: 'Identificación', field:'per_numeroid', sortable: true},
          { title: 'Tipo de siniestro', field:'sin_tipoatep', sortable: true},
          { title: 'Fecha', field:'sin_fecha', sortable: true, type: 'date',
            render: row => <Moment format="DD MMM YYYY">{ row["sin_fecha"]}</Moment>},
          { title: 'Estado', field:'sin_estado', sortable: true ,
            render: row => row["sin_estado"]==='RESERVADO'? (<div className="amarillo">{ row["sin_estado"] }</div>)
            : row["sin_estado"]==='OBJETADO' ? ( <div className="rojo">{row["sin_estado"]}</div> )  
            : row["sin_estado"]==='ACEPTADO' ? ( <div className="verde">{row["sin_estado"]}</div> )
            : (row["sin_estado"])
          },
          { title: 'Aceptar', field:'idreportes', sortable: true,
            render: row => <button onClick={() => this.cambio_estado(row["idreportes"], 'ACEPTADO')}  
            className="btn btn-primary btn-block mg-b-2 botonok">ACEPTAR</button>
          },
          { title: 'Objetar', field:'idreportes', sortable: true,
            render: row => <button onClick={() => this.cambio_estado(row["idreportes"], 'OBJETADO')}  
            className="btn btn-primary btn-block mg-b-2 botonmal">OBJETAR</button>
          }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Consulta de siniestros"/>
                <div className="am-mainpanel">
                  <div className="card pd-20 pd-sm-40">
                    <FiltrosConsulta devuelvedatos={this.dato} estado="Evalua" titulo='Evaluación'/>
                    <MaterialTable columns={columnas} data={this.state.tabe} title="Consulta de siniestros" options={{ actionsColumnIndex: -1 }} icons={definiciones}></MaterialTable>
                  </div>
              </div>
              <Footer></Footer>
            </div>
        );
    }
}
export default Evaluacion;