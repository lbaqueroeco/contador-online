import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import global from '../../../Global';
import Moment from 'react-moment';
import Cookies from 'universal-cookie';
import MaterialTable from 'material-table';
import definiciones from '../../../comunes/definiciones';

const cookies = new Cookies(); 

class revisarAutorizaciones extends Component {
    FechaInicial = React.createRef(); 
    FechaFinal = React.createRef(); 
    Identificacion = React.createRef(); 
    state = {
        tabe:[],
        status: null
    };
    componentDidMount() {
        this.consultas();
    }

    consultas = () => {
        var fec1=this.FechaInicial.current.value;
        if(fec1===""){
            fec1 = new Date().toJSON().slice(0,4).replace(/-/g,'-')+"-01-01";
        }
        var fec2=this.FechaFinal.current.value;
        if(fec2===""){
            fec2 = new Date().toJSON().slice(0,4).replace(/-/g,'-')+"-12-31";
        }
        var ced=this.Identificacion.current.value;
        if(ced===""){ced="0";}

        axios.get(global.url + "vista_autorizaciones/consulta_fechas/"+fec1+"/"+fec2+"/"+ced+"/1", 
        global.autentica).then((res) => {
              const tabe = res.data;
            this.setState({ tabe });
        });
    }
    currencyFormat(num) {
        if(num===null){ return '$ 0'; }
        return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    render() {
      if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="3")
      {
          return <Redirect to="./"/>;
      }
      const columnas = [
        { title: 'Nombre', field:'per_primernombre', sortable: true,
         cellStyle: { width: 90, minWidth: 90}},
        { title: 'Apellido', field:'per_primerapellido', sortable: true,
         cellStyle: { width: 90, minWidth: 90}},
        { title: 'Servicio', field:'ser_descripcion', sortable: true, 
          cellStyle: { width: 250, minWidth: 250} },
        { title: 'Fecha', field:'sin_fecha', sortable: true, type: 'date',
          render: row => <Moment format="DD MMM YYYY">{ row["sin_fecha"]}</Moment>,
          cellStyle: { width: 120, minWidth: 120}},
//        { title: 'Municipio', field: 'idsieniestros', sortable: true},  
//        { title: 'IPS', field: 'ips_nombre', sortable: true},  
        { title: 'Reservas', field:'valor_reservas', sortable: true, type: 'currency',
        render: row=> this.currencyFormat(row["valor_reservas"])},
        { title: 'Autorizaciones', field:'valor_servicios', sortable: true, type: 'currency',
        render: row=> this.currencyFormat(row["valor_servicios"])},
        { title: 'Reporte', field:'sin_tipoatep', sortable: true,
          render: row => <NavLink to={"/evaluarAutorizacion/"+ row["idautorizaciones"] }>Acciones</NavLink>

        }
      ]
      return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
      <div className="am-pagetitle">
      <h5 className="am-title">Autorizaciones</h5>
    </div>
    <div className="am-mainpanel">
      <div className="am-pagebody">
        <div className="card pd-20 pd-sm-40">
          <h6 className="card-body-title">Revisión de autorizaciones</h6>
          <form name="forma">
            <div className="row">
                <div className="col-lg-3 izqq">Fecha incial
                    <input ref={this.FechaInicial} onChange={this.consultas} className="form-control" type="date"/>
                </div>
                <div className="col-lg-3 izqq">Fecha final
                    <input ref={this.FechaFinal} onChange={this.consultas} className="form-control" type="date"/>
                </div>
                <div className="col-lg-3 izqq">Identificación
                    <input ref={this.Identificacion} onChange={this.consultas} className="form-control" type="text"/>
                </div>
            </div>
            <br></br>
          </form>
          <div className="table-wrapper" id="tablas">
            <MaterialTable columns={columnas} data={this.state.tabe} 
                title="Revisión de Autorizaciones"
                options={{ actionsColumnIndex: -1 }}
                icons={definiciones}
            ></MaterialTable>
          </div>
        </div>
      </div>
    </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default revisarAutorizaciones;