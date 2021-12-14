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
const cookies = new Cookies(); 

class evaluarAutorizacion extends Component {
    Estado = React.createRef(); 
    Ips = React.createRef(); 
    IpsDireccinada = React.createRef(); 
    Ciudad = React.createRef(); 
    Servicio = React.createRef(); 
    Diagnostico = React.createRef(); 
    Reporte = React.createRef(); 
    ValorReserva = React.createRef(); 
    idc = null;
    state = {
        sini:[],
        rsv:[],
        noa:[],
        ips1:[],
        ips2:[],
        revs:[],
        idsin:0,
        status: null,
        estados: ['APROBADO', 'OBJETADO']
    };
    componentDidMount() {
        this.idc=this.props.match.params.id;
        axios.get(global.url + "vista_autorizaciones/mostrar/" + this.idc, 
        global.autentica ).then((res) => {
            const sini = res.data;
            this.setState({ sini });
        });
    }

    cambioips = () =>
    {
        const idciu = this.Ciudad.current.value;
        const idser = this.Servicio.current.value;
        axios.get(global.url+"consultaips/Consulta/"+ idciu + "/" + idser, 
        global.autentica)
        .then(res => {
            const ips1 = res.data;
            const ips2 = res.data;
            this.setState({ips1});
            this.setState({ips2});
        });
    }
 
    revoca_reserva = (e) =>
    {
      e.preventDefault();
      var val = this.ValorReserva.current.value*-1;
      this.revs=
      {
        'idreportes': this.Reporte.current.value,
        'res_codigo': "CRER",
        'res_valor': val,
        'res_acumulado': val,
        'res_fecha': new Date(),
        'res_autorizacion': '0',
        'res_estado': 'REVOCADA',
        'res_fechacreacion': new Date(),
        'res_usucreacion': cookies.get("idusuarios")
      } 
      axios.post(global.url+"reservasas/crear", this.revs, 
      global.autentica).then(res =>{
          swal(
              'Reserva Adicionada', 'Se ha revocado la reserva', 'success'
          )
          this.setState({ status: 'Add'})
      })
      .catch((error) => {
          swal("Error al agregar la Reserva", "Hubo un error al revocar la reserva", "error");
          console.log(error);
          this.setState({ status: 'Mal'})
      });
    }

    crea_reserva = (e) => 
    {
        e.preventDefault();
        var val = this.ValorReserva.current.value*0.2;
        val = val.toFixed().toString();

        this.revs=
        {
          'idreportes': this.Reporte.current.value,
          'res_codigo': "CRES",
          'res_valor': val,
          'res_acumulado': val,
          'res_fecha': new Date(),
          'res_autorizacion': '0',
          'res_estado': 'APROBADA',
          'res_fechacreacion': new Date(),
          'res_usucreacion': cookies.get("idusuarios")
        }

        axios.post(global.url+"reservasas/crear", this.revs, 
        global.autentica).then(res =>{
            swal(
                'Reserva Adicionada', 'Se ha adicionado la reserva en un 20%', 'success'
            )
            this.setState({ status: 'Add'})
        })
        .catch((error) => {
            swal("Error al agregar la Reserva", "Hubo un error al agregar la reserva", "error");
            console.log(error);
            this.setState({ status: 'Mal'})
          });
    }

    guardar = (e) =>{
      e.preventDefault();
      axios
        .put(global.url + "autorizacionesas/Actualizar/" + this.idc , {
            "idautorizaciones": this.idc,
            'idreportes': this.Reporte.current.value,
            'idservicios': this.Servicio.current.value,
            'iddiagnosticos': this.Diagnostico.current.value,
            'aut_ipssolicitante': this.Ips.current.value,
            'aut_ipsdireccionada': this.IpsDireccinada.current.value,
            'aut_cuotamoderadora': '0',
            'aut_copago': '0',
            'aut_valorizacion': '0',
            'aut_codigoservicio': '',
            'aut_valorestimado': '0',
            'aut_estado': this.Estado.current.value,
            'aut_fechamodificacion': new Date(),
            'aut_usumodificacion': cookies.get("idusuarios")

        })
        .then((res) => {
          console.log(res);
          swal("Autorización actualizada", "Se ha actualizado la autorización", "success");
          this.setState({ status: 'Ok'})
        })
        .catch((error) => {
          swal("Autorización no actualizada", "Hubo un error al actualizar la autorización", "error");
          console.log(error);
          this.setState({ status: 'Mal'})
        });
    }
    currencyFormat(num) {
      return '$' + num; //.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    render() {
      if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="3")
      {
          return <Redirect to="./"/>;
      }
      if(this.state.status==="Ok"){
          return <Redirect to="/RevisarAutorizaciones"/>;
      }
      else if(this.state.status==="Add"){
          return <Redirect to="/RevisarAutorizaciones"/>;
      }
      else if(this.state.status==="Mal"){}
      return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-pagetitle"><h5 className="am-title">Evaluar autorización</h5></div>
                <div className="am-mainpanel">
                <div className="am-pagebody">
                  <div className="card pd-20 pd-sm-40">
                  <div className="row">
                      <div className="col-lg-12" align="center">
                          <h6 className="titul2">Información de la autorización</h6><br></br>
                      </div>
                  </div> 
                  {
                  this.state.sini.map((sin, i) => {
                    return (
                      <React.Fragment key={i}>
                      <div className="row">
                          <div className="col-lg-3 izqq">
                              <input type="hidden" defaultValue={sin.idciudadeps} ref={this.Ciudad}/>
                              <input type="hidden" defaultValue={sin.idservicios} ref={this.Servicio}/>
                              <input type="hidden" defaultValue={sin.iddiagnosticos} ref={this.Diagnostico}/>
                              <input type="hidden" defaultValue={sin.idreportes} ref={this.Reporte}/>
                              <input type="hidden" defaultValue={sin.valor_reservas} ref={this.ValorReserva}/>
                            <b>Primer Apellido: </b>{sin.per_primerapellido}
                          </div>
                          <div className="col-lg-3 izqq">
                            <b>Segundo Apellido: </b>{sin.per_segundoapellido}
                          </div>
                          <div className="col-lg-3 izqq">
                            <b>Primer Nombre: </b>{sin.per_primernombre}
                          </div>
                          <div className="col-lg-3 izqq">
                            <b>Segundo Nombre: </b>{sin.per_segundonombre}<br></br>
                          </div>
                      </div>   
                      <div className="row">
                          <div className="col-lg-12 izqq">
                            <b>Servicio solicitado: </b><br></br>{sin.ser_descripcion}<br></br><br></br>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-lg-3 izqq">
                            <b>IPS direccionada: </b><Moment format="MMM DD">{sin.ips_nombre}</Moment><br></br>
                          </div>
                          <div className="col-lg-3 izqq">
                            <b>Diagnósticos: </b>{sin.dia_descripcion }<br></br>
                          </div>
                          {
                              sin.aut_estado==='APROBADO' ? ( 
                                <div className="col-lg-3 izqq verde">
                                <b>Estado: </b>{sin.aut_estado }<br></br><br></br>
                                </div>
                              )
                              : sin.aut_estado==='OBJETADO' ? (
                                <div className="col-lg-3 izqq rojo">
                                    <b>Estado: </b>{sin.aut_estado }<br></br><br></br>
                                </div>
                              )
                              : (
                                <div className="col-lg-3 izqq amarillo">
                                  <b>Estado: </b> PENDIENTE<br></br><br></br>
                                </div>
                              )
                          }          
                      </div>    
                      <div className="row">
                        <div className="col-lg-6"><br></br></div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                            <h6 className='titul2'>Reservas</h6><br></br>
                        </div>
                      </div>    
                      <div className="row">
                        <div className="col-lg-6">
                        <form onSubmit={this.crea_reserva} name="form3">
                          <input type="submit" className="btn btn-info pd-x-20" value="Agregar reserva"/>
                        </form>
                          <br></br>
                        </div>
                        <div className="col-lg-6">
                        <form onSubmit={this.revoca_reserva} name="form4">
                          <input type="submit" className="btn btn-info pd-x-20" value="Revocar reserva"/>
                        </form>
                          <br></br>
                        </div>
                      </div>    
                      <div className="row">
                        <div className="col-lg-12">
                            <h6 className='titul2'>Valores</h6><br></br>
                        </div>
                      </div>    
                      <div className="row">
                        <div className="col-lg-3 izqq">Valor reservas: </div>
                        <div className="col-lg-3 izqq">{ this.currencyFormat(sin.valor_reservas)  }</div>
                        <div className="col-lg-3 izqq">Valor autorizaciones: </div>
                        <div className="col-lg-3 izqq">{ this.currencyFormat(sin.valor_servicios) }<br></br><br></br></div>
                      </div>
                    </React.Fragment>    
                    )
                })
            }

                    <div className="row">
                      <div className="col-lg-12">
                          <h6 className='titul2'>Redireccionar</h6><br></br>
                      </div>
                    </div>    
                    <React.Fragment>
                      <form name="forma" onSubmit={this.guardar}>
                      <div class="row">
                        <div class="col-lg-3 izqq">
                          <b>Estado: </b><br></br>
                        </div>
                        <div class="col-lg-3 izqq">  
                            <select class="form-control" ref={this.Estado} onChange={this.cambioips} required>
                                <option value="" selected>Estado</option>
                                {
                                    this.state.estados.map((est, i) => {
                                    return (
                                            <option key={i} value={est}>{est}</option>
                                        )
                                    })
                                }
                            </select><br></br>
                        </div>
                        <div class="col-lg-3 izqq">
                          <b>IPS solicitante: </b><br></br>
                        </div>
                        <div class="col-lg-3 izqq">
                            <select class="form-control" ref={this.Ips}  required>
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
                    <div class="row">
                        <div class="col-lg-3 izqq">
                          <b>IPS direccionamiento: </b><br></br>
                        </div>
                        <div class="col-lg-3 izqq">
                            <select class="form-control" name="ips2" ref={this.IpsDireccinada}  required>
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
                        <div className="col-lg-6 " align="right">
                            <input type="submit" className="btn btn-info pd-x-20" value="Guardar Cambios" /><br></br>
                          <br></br>
                        </div>
                      </div>
                      </form>
                    </React.Fragment>
                  </div>
                </div>
              </div>
              <Footer></Footer>
            </div>
        );
    }
}
export default evaluarAutorizacion;