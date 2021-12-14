import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import axios from 'axios';
import global from '../../../Global';
import Moment from 'react-moment';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import MaterialTable from 'material-table';
import definiciones from '../../../comunes/definiciones';
import Titulo from '../../../comunes/Titulo';
import Titulo3 from '../../../comunes/Titulo3';
import Fila3 from '../../../comunes/fila3';
import Fila2 from '../../../comunes/flla2';

const cookies = new Cookies(); 

class detalleReservas extends Component {
    Servicio = React.createRef(); 
    Departamento = React.createRef(); 
    Municipio = React.createRef(); 
    Direccion = React.createRef(); 
    Telefono = React.createRef(); 
    IpsSolicitante = React.createRef(); 
    Diagnostico = React.createRef(); 
    IpsDireccionada = React.createRef(); 
    idc = null;
    idafiliados = null;
    state = { sin:[], rsv:[], serv:[], dept:[], ciud:[], ips1:[], ips2:[], diag:[], status: null
    };
    componentDidMount() {
        this.idc=this.props.match.params.id;
        axios.get(global.url + "vista_siniestros/Muestra/" + this.idc, global.autentica ).then((res) => {
            const sin = res.data;
            this.setState({ sin });
            console.log( this.sin);
            this.setState({idafiliados: res.data.idafiliados })
          });
        axios.get(global.url + "reservasas/Mostrarsin/" + this.idc, global.autentica).then((res) => {
            const rsv = res.data;
            this.setState({rsv});
        });
        axios.get(global.url + "servicios/listar", global.autentica).then((res) => {
            const serv = res.data;
            this.setState({serv});
        });
        axios.get(global.url + "departamentos/listar", global.autentica).then((res) => {
            const dept = res.data;
            this.setState({dept});
        });
        axios.get(global.url + "ips/listar", global.autentica).then((res) => {
            const ips1 = res.data;
            const ips2 = res.data;
            this.setState({ips1});
            this.setState({ips2});
        });
        axios.get(global.url + "diagnosticos/listar", global.autentica).then((res) => {
            const diag = res.data;
            this.setState({diag});
        });
    }

    cambioips = () =>
    {
        const idciu = this.Municipio.current.value;
        const idser = this.Servicio.current.value;
        axios.get(global.url+"consultaips/Consulta/"+ idciu + "/" + idser, global.autentica)
        .then(res => {
            const ips1 = res.data;
            const ips2 = res.data;
            this.setState({ips1});
            this.setState({ips2});
        });
    }
    cambiodep = () =>
    {
        const iddep = this.Departamento.current.value;
        console.log(iddep);
        axios.get(global.url+"ciudades/Consulta_dep/"+ iddep, global.autentica)
        .then(res => {
            const ciud = res.data;
            this.setState({ ciud });
        });
    }
    guardar = (e) =>{
      e.preventDefault();
      axios
        .post(global.url + "autorizacionesas/Crear/" , {
            "idreportes": this.idc, 
            "idservicios": this.Servicio.current.value, 
            "aut_ipssolicitante": this.IpsSolicitante.current.value, 
            "aut_ipsdireccionada": this.IpsDireccionada.current.value, 
            "aut_cuotamoderadora": 0, 
            "aut_copago": 0, 
            "aut_valorizacion": 0, 
            "aut_codigoservicio": 0, 
            "aut_valorestimado": 0, 
            "iddiagnosticos": this.Diagnostico.current.value, 
            "aut_estado": "",
            'aut_fechacreacion': new Date(),
            'aut_usucreacion': cookies.get("idusuarios")

        }, global.autentica)
        .then((res) => {
          console.log(res);
          swal("Autorización creada", "Se ha creado correctamente la autorización", "success");
          this.setState({ status: 'Ok'})
        })
        .catch((error) => {
          swal("Autorización no creada", "Hubo un error al crear la autorización", "error");
          console.log(error);
          this.setState({ status: 'Mal'})

        });
    }
    currencyFormat(num) {
      return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="3")
        {
            return <Redirect to="./"/>;
        }
        if(this.state.status==="Ok"){
            return <Redirect to="/RevisarAutorizaciones"/>;
        }
        else if(this.state.status==="Mal"){}
        const columnas = [
            { title: 'Código', field:'res_codigo', sortable: true},
            { title: 'Valor', field:'res_valor', sortable: true, 
              render: row => this.currencyFormat(row["res_valor"])},
            { title: 'Fecha', field:'res_fecha', sortable: true, type: 'date',
              render: row => <Moment format="DD MMM YYYY">{ row["res_fecha"]}</Moment>},
            { title: 'Estado', field:'res_estado', sortable: true},
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Reservas"/>
                <div className="am-mainpanel">
                <div className="card pd-20 pd-sm-40">
                {
                    this.state.sin.map((sin, i) => {
                        return (
                        <React.Fragment key={i}>
                        <div className="row">
                            <Fila3 ancho="col-lg-3 izqq1 verde" valor={sin.sin_estado } nombre="Estado"></Fila3>
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
                        </React.Fragment>    
                        )
                    })
                }
                <Titulo3 titulo="Reservas"/>
                <div className="row">
                    <div className="col-lg-12" align="center">
                        <div className="table-wrapper" id="tablas">
                        <MaterialTable columns={columnas} data={this.state.rsv} 
                            title="Reservas" icons={definiciones}></MaterialTable>
                        </div>
                    </div>
                </div>   
                <React.Fragment>
                <form name="forma" onSubmit={this.guardar}>
                <Titulo3 titulo="Solicitud de autorización"/>
                <div className="row">
                    <div className="col-lg-3 izqq">
                    <b>Servicio solicitado: </b><br></br>
                    </div>
                    <div className="col-lg-9 izqq">  
                        <select className="form-control" onChange={this.cambioips} ref={this.Servicio} required>
                            <option value="" selected>Servicio solicitado</option>
                            {
                                this.state.serv.map((ser, i) => {
                                return (
                                    <option key={ser.idservicios} value={ser.idservicios}>
                                    {ser.ser_descripcion} {ser.ser_codigo}</option> 
                                    )
                                })
                            }
                        </select><br></br>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 izqq"><b>Departamento: </b><br></br></div>
                    <div className="col-lg-3 izqq">
                        <select className="form-control" onChange={this.cambiodep} ref={this.Departamento} required>
                            <option value="" selected>Departamento</option>
                            {
                                this.state.dept.map((dep, i) => {
                                return (
                                    <option key={dep.iddepartamentos} value={dep.iddepartamentos}>
                                    {dep.dep_nombre} </option> 
                                    )
                                })
                            }
                        </select><br></br>
                    </div>
                    <div className="col-lg-3 izqq"><b>Municipio: </b><br></br></div>
                    <div className="col-lg-3 izqq">
                        <select className="form-control" ref={this.Municipio} onChange={this.cambioips} name="mun" required>
                            <option value="" selected>Municipio</option>
                            {
                                this.state.ciud.map((con, i) => {
                                return (
                                        <option key={con.idciudades} value={con.idciudades}>{con.mun_nombre}</option>
                                    )
                                })
                            }
                        </select><br></br>
                    </div>
                </div>
                <div className="row">
                    <Fila2 ancho="col-lg-3" nombre="Dirección" refer="Direccion" tipo="1" arreglo="" defecto="" />
                    <Fila2 ancho="col-lg-3" nombre="Teléfono" refer="Telefono" tipo="1" arreglo="" defecto="" />
                    <div className="col-lg-3 izqq">
                        <b>IPS solicitante: </b><br></br>
                        </div>
                        <div className="col-lg-3 izqq">
                            <select className="form-control" ref={this.IpsSolicitante} required>
                                <option value="" selected>IPS</option>
                                {
                                    this.state.ips1.map((ips, i) => {
                                    return (
                                            <option key={ips.idips} value={ips.idips}>{ips.ips_nombre}</option>
                                        )
                                    })
                                }
                            </select><br></br>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 izqq"><b>Diagnóstico: </b><br></br></div>
                    <div className="col-lg-3 izqq">
                        <select className="form-control" ref={this.Diagnostico}  required>
                            <option value="" selected>Diagnósticos</option>
                            {
                                this.state.diag.map((dia, i) => {
                                return (
                                    <option key={dia.iddiagnosticos} value={dia.iddiagnosticos}>
                                    {dia.dia_descripcion}</option>
                                )
                            })
                            }
                        </select><br></br>
                    </div>
                    <div className="col-lg-3 izqq"><b>IPS direccionamiento: </b><br></br></div>
                    <div className="col-lg-3 izqq">
                        <select className="form-control" ref={this.IpsDireccionada} name="ips2" required>
                            <option value="" selected>IPS</option>
                            {
                                this.state.ips2.map((ips, i) => {
                                return (
                                    <option key={ips.idips} value={ips.idips}>{ips.ips_nombre}</option>
                                )
                                })
                            }
                        </select><br></br>
                    </div>
                    <div className="col-lg-6"></div>
                    <div className="col-lg-6" align="right">
                        <input type="submit" className="btn btn-info pd-x-20" value="Guardar Cambios" /><br></br>
                    </div>
                </div>
          </form>
          </React.Fragment>
        </div>
    </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default detalleReservas;