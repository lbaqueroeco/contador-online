import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import axios from 'axios';
import global from '../../../Global';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import MaterialTable from 'material-table';
import definiciones from '../../../comunes/definiciones';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Titulo from '../../../comunes/Titulo';
import Titulo3 from '../../../comunes/Titulo3';
import Fila3 from '../../../comunes/fila3';
import Fila2 from '../../../comunes/flla2';
const cookies = new Cookies(); 

class detalleObjetado extends Component {
    TipoAccion = React.createRef(); 
    Descripcion = React.createRef(); 
    Fecha = React.createRef(); 
    idc = null;
    state = {
        sin:[],
        noa:[],
        status: null
    };
    componentDidMount() {
        this.idc=this.props.match.params.id;
        console.log(this.idc);
        axios.get(global.url + "vista_siniestros/Muestra/" + this.idc, global.autentica ).then((res) => {
            const sin = res.data;
            console.log(res.data);
            this.setState({ sin });
          });
          this.gestiones();
    }
    gestiones (){
        axios.get(global.url + "noaceptadosas/Mostrarsin/" + this.idc, global.autentica ).then((res) => {
            const noa = res.data;
            this.setState({ noa });
        });
    }
    guardar = (e) =>{
      e.preventDefault();
      axios
        .post(global.url + "noaceptadosas/Crear/" , {
            "idreportes": this.idc, 
            "noa_descripcion": document.forma.Descripcion.value, 
            "noa_tipoaccion": document.forma.TipoAccion.value, 
            "noa_fecha": document.forma.Fecha.value,
            'noa_fechacreacion': new Date(),
            'noa_usucreacion': cookies.get("idusuarios")
        })
        .then((res) => {
          console.log(res);
          swal("Seguimiento creado", "Se ha creado correctamente el seguimiento", "success");
          this.setState({ status: 'Ok'})
          this.gestiones();
        })
        .catch((error) => {
          swal("Seguimiento no creado", "Hubo un error al crear el seguimiento", "error");
          console.log(error);
          this.setState({ status: 'Mal'})
        });
    }
    currencyFormat(num) {
      return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    elimina  = (id) =>{ 
        swal({
            title: "Está seguro?",
            text: "Una vez lo elimine no podrá recuperarlo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              axios.delete(global.url+"noaceptadosas/Eliminar/" + id).then((res) => {
                swal("Seguimiento Eliminado", "Se ha eliminado el seguimiento", "success");
                this.setState({ status: 'deleted'})
                this.gestiones();
              });
            } else {
              swal("Eliminación cancelada");
            }
          });
    }
    render() {
      if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="3")
      {
          return <Redirect to="./"/>;
      }
      const columnas = [
        { title: 'Tipo de acción', field:'noa_tipoaccion', sortable: true},
        { title: 'Fecha', field:'noa_fecha', sortable: true,
        cellStyle: { width: 300, minWidth: 300}},
        { title: 'Descripción', field:'noa_descripcion', sortable: true},
      ]
      return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Reporte Objetados"/>
                <div className="am-mainpanel">
                <div className="card pd-20 pd-sm-40">
                {
                  this.state.sin.map((sin, i) => {
                  return (
                    <React.Fragment key={i}>
                    <div className="row">
                      <Fila3 ancho="col-lg-3 izqq1 rojo" valor={sin.sin_estado } nombre="Estado"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.eps_nombre } nombre="EPS del Afiliado"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.emp_nombre } nombre="Nombre Razón social"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.emp_nit } nombre="Identificación"></Fila3>
                    </div>    
                    <div className="row">
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.per_primerapellido } nombre="Primer Apellido"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.per_segundoapellido } nombre="Segundo Apellido"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.per_primernombre } nombre="Primer Nombre"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.per_segundonombre } nombre="Segundo Nombre"></Fila3>
                    </div>
                    <div className="row">
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.per_numeroid } nombre="Documento"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.per_nacimiento } nombre="Fecha de nacimiento"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.per_genero } nombre="Género"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.mun_nombre } nombre="Municipio"></Fila3>
                    </div>    
                    <div className="row">
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.sin_fecha } nombre="Fecha accidente"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.sin_causal } nombre="Causa del accidente"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.sin_muerte } nombre="¿Causó la muerte al trabajador?"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.sin_lugar } nombre="Lugar de ocurrencia"></Fila3>
                    </div> 
                    <div className="row">
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.sin_lugar } nombre="Lugar de ocurrencia"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.sin_sitio } nombre="Sitio del accidente"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.sin_tipolesion } nombre="Tipo de lesión"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.sin_parteafectada } nombre="Parte del cuerpo afectada"></Fila3>
                    </div> 
                    <div className="row">
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.sin_agente } nombre="Agentes del accidente"></Fila3>
                      <Fila3 ancho="col-lg-3 izqq1" valor={sin.sin_mecanismo } nombre="Mecanismo o forma"></Fila3>
                    </div>    
                    </React.Fragment>    
                    )
                })
            }<br></br>
            <Titulo3 titulo="Agregar Seguimiento"/>
            <React.Fragment>
            <form name="forma" onSubmit={this.guardar}>
            <div className="row">
              <Fila2 ancho="col-lg-3" nombre="Tipo acción" refer="TipoAccion" tipo="1" arreglo="1" defecto="" />
              <Fila2 ancho="col-lg-3" nombre="Fecha de revisión" refer="Fecha" tipo="7" arreglo="1" defecto=""/>
              <Fila2 ancho="col-lg-6" nombre="DESCRIPCION DE LA ACTIVIDAD LABORAL DESEMPEÑADA (NEXO LABORAL)" refer="Descripcion" tipo="10" arreglo="1" defecto=""/>
            </div><br></br>
            <div className="row">
              <div className="col-lg-6"></div>
              <div className="col-lg-6" align="right">
                  <input type="submit" className="btn btn-info pd-x-20" value="Guardar Cambios" /><br></br>
                <br></br>
              </div>
            </div>
            </form>
            </React.Fragment>
            <Titulo3 titulo="Seguimientos"/>
              <div className="row">
                <div className="col-lg-12" align="center">
                    <div className="table-wrapper" id="tablas">
                    <MaterialTable columns={columnas} data={this.state.noa} 
                          title="Seguimiento no objetados"
                          actions={[
                            {
                              icon: () => <DeleteOutline ClassName='tituls' />,
                              tooltip: 'Eliminar seguimiento', 
                              onClick: (event, rowData)=>this.elimina(rowData.idnoaceptados)
                            }
                          ]}
                          options={{ actionsColumnIndex: -1 }}
                          localization={{ header:{ actions: 'Acciones'}}}
                          icons={definiciones}
                      ></MaterialTable>
                    </div>
                </div>
              </div>   
            </div>
        </div>
        <Footer></Footer>
        </div>
        );
    }
}
export default detalleObjetado;