import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import EncTabla from '../../../comunes/EncTabla';
import Tabla from '../../../comunes/Tabla';
import Tabla3 from '../../../comunes/Tabla3';
import Script3 from '../../../scripts/scripts3';
import Moment from 'react-moment';
import axios from 'axios';
import global from '../../../Global';
import swal from 'sweetalert';
import Descargado from '../../../comunes/descargardocs';

const cookies = new Cookies(); 
class clasificaAportantes extends Component {
    
    state = { rols:[], enti:[], logs:[], facs:[], dent:[], tabe1:[], tabe2:[], status: null, 
    idd:[], file: null, aport: 0, lit1:[], lit2:[] };
    handleSubmitFile = (e) => {
        e.preventDefault();
        if (this.state.file !== null) {
            var forv = this.state.facs.length;
            var factors="";
            for(var i=0; i<forv; i++)
            {
                var camp="par"+i;
                if (document.getElementById(camp).checked === true){
                    factors+=(document.getElementById(camp).value)+", ";
                }
            }
            factors=factors.substring(0,factors.length-2);
            const idd=this.props.match.params.id;

            let formData = new FormData();
            formData.append('faa_documento', this.state.file);
            formData.append('faa_factores', factors);
            formData.append('aportantes_idaportantes', idd);
            axios.post(global.url+"documentosaportantes/subirfac",formData,
            { headers: { "Content-type": "multipart/form-data;"}}
            ).then(res => { 
                swal("Factores salariales cargados", "Se han cargado correctamente los factores salariales", "success");
            })
            .catch(err => {
                swal("Error de carga", "Error al cargar el documento", "error");
            })
        }
    }
    handleImagePreview = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    }
    componentDidMount() { 
      const idd=this.props.match.params.id;
      this.setState({ idd });
      axios.get(global.url + "estructuranomnina", global.autentica).then(res => {
            let facs = res.data;
            this.setState({ facs });
      });
      var tabla2="aportantes/"+idd;
      axios.get(global.url + tabla2, global.autentica ).then((res) => {
          const dent = res.data;
          this.setState({ dent });
          console.log(dent);
      }); 
      axios.get(global.url + "logs/"+idd, global.autentica ).then((res) => {
          const logs = res.data;
          this.setState({ logs });
      }); 
      axios.get(global.url + "reportes/filtro5/"+idd, global.autentica ).then((res) => {
          var tabe = res.data;
          var lit1 = tabe;
          this.setState({ lit1 });

          let tabe1 =
          [
              [
                  { type: 'string', id: 'Aportante' },
                  { type: 'string', id: 'Documento/enlace' },
                  { type: 'date', id: 'Inicio' },
                  { type: 'date', id: 'Fin' },
              ],
          ]
          for (var i=0; i<tabe.length; i+=1) {
              var fech1=tabe[i].fecha.substr(0,10);
              var fech2=fech1.split("-");
              var ano=fech2[0];
              var mes=fech2[1];
              mes=mes-1;
              if(mes<0){ mes=12; ano--; }
              var dia=fech2[2];
              var dia2=parseInt(dia)+1;
              if(mes===0 || mes===2 || mes===4 || mes===6 || mes===7 || mes===9 || mes===11)
              {
                  if(dia2===32){ dia2=1; mes++; }
                  if(mes===12){ mes=1; }
              }
              else if(mes===1){
                  if(dia2===29){ dia2=1; mes++; }
              }
              else if(mes===3 || mes===5 || mes===8 || mes===10) 
              {
                  if(dia2===31){ dia2=1; mes++; }
              }
              if(mes===12){ mes=11; ano--;}
              var desde= new Date(ano, mes, dia);
              var hasta= new Date(ano, mes, dia2);
              tabe1.push([tabe[i].apo_identificacion, tabe[i].tipo, desde, hasta]);
          }
          this.setState({ tabe1 });
      }); 
      axios.get(global.url + "reportes/filtro6/"+idd, global.autentica ).then((res) => {
        var tabe = res.data;
        var lit2 = tabe;
        this.setState({ lit2 });
        let tabe2 =
        [
            [
                { type: 'string', id: 'Aportante' },
                { type: 'string', id: 'Documento/enlace' },
                { type: 'date', id: 'Inicio' },
                { type: 'date', id: 'Fin' },
            ],
        ]
        for (var i=0; i<tabe.length; i+=1) {
            var fech1=tabe[i].fecha.substr(0,10);
            var fech2=fech1.split("-");
            var ano=fech2[0];
            var mes=fech2[1];
            mes=mes-1;
            if(mes<0){ mes=12; ano--; }
            var dia=fech2[2];
            var dia2=parseInt(dia)+1;
            if(mes===0 || mes===2 || mes===4 || mes===6 || mes===7 || mes===9 || mes===11)
            {
                if(dia2===32){ dia2=1; mes++; }
                if(mes===12){ mes=1; }
            }
            else if(mes===1){
                if(dia2===29){ dia2=1; mes++; }
            }
            else if(mes===3 || mes===5 || mes===8 || mes===10) 
            {
                if(dia2===31){ dia2=1; mes++; }
            }
            if(mes===12){ mes=11; ano--;}
            var desde= new Date(ano, mes, dia);
            var hasta= new Date(ano, mes, dia2);
            tabe2.push([tabe[i].apo_identificacion, tabe[i].tipo, desde, hasta]);
        }
        this.setState({ tabe2 });
    }); 
    }
    dato = (rols) => { this.setState({ rols }); }
    render() {
        if(!cookies.get("idroles")){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/enlaces"/>;}
        const columnas = [
            { title: 'Fecha registro', headerStyle: { "text-align":"center", "padding":"0px"}, field:'res_fecha', sortable: true, type: 'date',
            render: row => <Moment format="DD MMM YYYY">{ row["res_fechacrea"]}</Moment>},
            { title: 'Nombre', headerStyle: { "text-align":"center", "padding":"0px"}, field: 'res_nombre', sortable: true },
            { title: 'Identificación', headerStyle: { "text-align":"center", "padding":"0px"}, field: 'res_identificacion', sortable: true },
            { title: 'Cargo', headerStyle: { "text-align":"center", "padding":"0px"}, field: 'res_cargo', sortable: true },
            { title: 'Teléfono', headerStyle: { "text-align":"center", "padding":"0px"}, field: 'res_telefono', sortable: true },
            { title: 'Email', headerStyle: { "text-align":"center", "padding":"0px"}, field: 'res_email', sortable: true },
            {title: 'Anexos', field: 'idresponsables', sortable: false, width: "10%",
            render: row => (<Descargado docid={row["idresponsables"]} tipo="responsable" />)}
    ]/*
        const columnas2 = [
            { title: 'Fecha', field: 'log_fecha', sortable: true },
            { title: 'Acción', field: 'log_accion', sortable: true },
            { title: 'Elemento', field: 'log_objeto', sortable: true },
            { title: 'Usuario', field: 'usu_nombre', sortable: true }
        ]*/
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat> 
                <div className="am-mainpanel">
                    <div className="card pd-20 pd-sm-40">
                    <div className='row fblanco2'>
                        <div className='col-lg-3 izqq1'>
                            <NavLink className="btn btn-secondary" to="/aportantes">Volver</NavLink>
                        </div>
                    </div>

                    <form  name="forma" onSubmit={this.guardar}>
                    {
                      this.state.dent.map((sin, i) => {
                        return (
                            <div className='row '>
                                <div className='col-lg-12'>

                            <div className="row fblanco2">
                                <div className='col-md-12'>
                                    <h4>{sin.apo_nombre }</h4>
                                    <h6>
                                    { sin.apo_sufijo===""?("NIT: " + sin.apo_identificacion):
                                    sin.apo_sufijo==="0"?("NIT: " + sin.apo_identificacion)
                                    :("NIT: " + sin.apo_identificacion +"-"+sin.apo_sufijo )}
                                    </h6>
                                </div>
                            </div>
                            <div className='row fblanco2'>
                                <div className='col-md-3'><b>Macrozona</b></div>
                                <div className='col-md-3'>{sin.ter_macrozona}</div>
                                <div className='col-md-3'><b>Territorial</b></div>
                                <div className='col-md-3'>{sin.ter_nombre}</div>
                            </div>
                            <div className='row fblanco2'>
                                <div className='col-md-3'><b>Departamento</b></div>
                                <div className='col-md-3'>{sin.dep_nombre}</div>
                                <div className='col-md-3'><b>Municipio</b></div>
                                <div className='col-md-3'>{sin.ciu_nombre}</div>
                            </div>
                            </div></div>
                        )
                      })
                    }
                    <div className="row">
                        <div className='col-md-12 izqq divacs'>
                            <div className='griss'>
                            <Script3 tabla={"responsables/aportante/"+this.props.match.params.id} devuelvedatos={this.dato} />
                            { cookies.get("idroles")==="1" || cookies.get("idroles")==="3"? (
                            <React.Fragment>
                                <EncTabla titulo="Enlaces de la entidad aportante" link={"/crearresp/"+this.state.idd} titulo2="Enlace" />
                                <br></br>
                                <Tabla tabla="responsables" columnas={columnas} valores={this.state.rols} 
                                redire="/aportantes" titulo="Enlaces" link="/editaresp/" />
                            </React.Fragment> ) : (
                            <React.Fragment>
                                <h6 className="card-body-title">Enlaces de la entidad aportante</h6>
                                <Tabla3 tabla="responsables" columnas={columnas} valores={this.state.rols} 
                                redire="/aportantes" titulo="Enlaces" link="/editaresp/" />
                            </React.Fragment>
                            )
                            }
                            </div>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-md-6 izqq divacs">
                            <div className='griss'>
                                <h6 className="card-body-title">Factores salariales certificados</h6>
                                <br></br>
                                {
                                    this.state.facs.map((con, i) => {
                                        var color="row fofbl";
                                        if(i%2===0){ color="row fofgr"; } 
                                        return ( 
                                        <div className={color}>
                                            <div className="col-md-2 derechas">
                                            { 
                                            cookies.get("idroles")==="1" || cookies.get("idroles")==="3"? (
                                                <input name={"par"+i} id={"par"+i} ref={i} defaultValue={con.est_nombre} className="" type="checkbox" />
                                            ):(<React.Fragment></React.Fragment>)
                                            }
                                            </div>
                                            <div className="col-md-10 izqq" style={{"font-size":"11px"}}>{con.est_nombre}</div>
                                        </div>
                                        )
                                    })
                                }
                { 
                    cookies.get("idroles")==="1" || cookies.get("idroles")==="3"? (
                <React.Fragment>
                <div className="row">
                    <div className="col-md-6 izqq">Soporte de modificación</div>
                    <div className="col-md-6 derechas">
                    <input type="file" className="form-control" onChange={this.handleImagePreview} name="docs_aportantes"/>
                    </div>
                </div>
                <div className="row fofbl">
                    <div className="col-md-6 izqq">
                    </div>
                    <div className="col-md-6 derechas"><br></br>
                    <input type="submit" className="btn btn-info pd-x-20" onClick={this.handleSubmitFile} value="Guardar" />
                    <br></br>
                    </div>
                </div>
                </React.Fragment> ):(<React.Fragment></React.Fragment>)
                }

                            </div>
                        </div>
                        <div className="col-lg-6 izqq divacs">
                            <div className='row'>
                                <div className="col-lg-12 ">
                                <div className='griss'>
                                <h6 className="card-body-title">Línea de tiempo enlaces</h6>
                                <br></br>
                                <div className='timeline'>
                                <div class="v-line"></div>
                                {
                                    this.state.lit1.map((con, i) => {
                                        var color="uno";
                                        if(i%2===0){ color="dos"; } 
                                        return ( 
                                        <div className={color}>
                                            <div className='fechas'><b>{con.fecha.substr(0,10)}</b><br></br></div>
                                            <b>{con.nombre}</b><br></br>
                                            {con.ruta}<br></br>
                                            <a href={"mailto:"+con.res_email}>{con.res_email}</a><br></br>
                                            <Descargado docid="1" tipo="responsable" />
                                        </div>
                                        )
                                    })
                                }
                                </div>
                            </div> 
                            </div>                      
                            </div>
                            <div className='row'>
                                <div className="col-lg-12 ">
                                <div className='griss'>
                                <h6 className="card-body-title">Línea de tiempo factores salariales</h6>
                                <br></br>
                                    <div className='timeline'>
                                    <div class="v-line"></div>
                                    {
                                        this.state.lit2.map((con, i) => {
                                            var color="uno";
                                            if(i%2===0){ color="dos"; } 
                                            return ( 
                                            <div className={color}>
                                            <div className='fechas'><b>{con.fecha.substr(0,10)}</b><br></br></div>
                                            <b>{con.tipo}</b><br></br>
                                            <Descargado docid="1" tipo="responsable" />
                                            </div>
                                            )
                                        })
                                    }
                                    </div>
                                </div> 
                                </div>                      
                            </div>

                        </div>
                    </div>
                    </form>

                    {/* 
                    <div className="row">
                        <div className="col-lg-12 izqq divacs">
                            <div className='griss'>
                                <h6 className="card-body-title">Log de quién hace el cambio</h6>
                                <Tabla3 tabla="logs" columnas={columnas2} valores={this.state.logs} titulo="Logs de eventos" link="/" />
                            </div>                       
                        </div>
                    </div>
*/}
                    </div>
                </div>
                <div className="modal-footer">
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default clasificaAportantes;