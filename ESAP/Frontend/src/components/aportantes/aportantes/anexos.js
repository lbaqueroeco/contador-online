import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Tabla from '../../../comunes/Tabla2';
import Tabla3 from '../../../comunes/Tabla3';
import Script3 from '../../../scripts/scripts3';
import Moment from 'react-moment';
import axios from 'axios';
import global from '../../../Global';
import Descargado from '../../../comunes/descargardocs';
import EncTabla from '../../../comunes/EncTabla';
import Fila from '../../../comunes/fila';
import swal from 'sweetalert';

const cookies = new Cookies();
class anexos extends Component {
    state = { rols: [], enti: [], dent:[], tidc: [], status: null, idd: [], tabe1:[], tabe2:[],
    tipos:["De obligada a no obligada", "De no obligada a obligada", "De en estudio de obligatoriedad a obligada", 
    "De en estudio de obligatoriedad a no obligada", "De sub unidad ejecutora del gasto a NIT principal"], tabe3:[] };
    handleSubmitFile = (e) => {
        e.preventDefault();
        if (this.state.file !== null) {
            const idd=this.props.match.params.id;
            const idusuario=cookies.get("idusuarios");
            let formData = new FormData();
            formData.append('tra_ruta', this.state.file);
            formData.append('tra_tipo', document.forma.tipo.value);
            formData.append('tra_observaciones', document.forma.observacion.value);
            formData.append('tra_usuario', idusuario);
            formData.append('aportantes_idaportantes', idd);
            axios.post(global.url+"documentosaportantes/subirtran",formData,
            { headers: { "Content-type": "multipart/form-data;"}}
            ).then(res => { 
                const tip=document.forma.tipo.value;
                if(tip==="De sub unidad ejecutora del gasto a NIT principal")
                {
                    const tabe1 = { "sectores_idsectores": "1" }
                    axios.put(global.url + "aportantes/editasector/"+idd, tabe1, global.autentica).then(res => {});
                }
                else if(tip==="De obligada a no obligada"){
                    const tabe1 = { "clasificaaportantes_idclasificaaportantes": "2" }
                    axios.put(global.url + "aportantes/editaclasifica/"+idd, tabe1, global.autentica).then(res => {
                    });
                }
                else if(tip==="De no obligada a obligada"){
                    const tabe1 = { "clasificaaportantes_idclasificaaportantes": "1" }
                    axios.put(global.url + "aportantes/editaclasifica/"+idd, tabe1, global.autentica).then(res => {});
                }
                else if(tip==="De en estudio de obligatoriedad a obligada"){
                    const tabe1 = { "clasificaaportantes_idclasificaaportantes": "1" }
                    axios.put(global.url + "aportantes/editaclasifica/"+idd, tabe1, global.autentica).then(res => {});
                }
                else if(tip==="De en estudio de obligatoriedad a no obligada"){
                    const tabe1 = { "clasificaaportantes_idclasificaaportantes": "2" }
                    axios.put(global.url + "aportantes/editaclasifica/"+idd, tabe1, global.autentica).then(res => {});
                }
                swal("La Transición de la entidad ha sido cargada", "Se ha cargado correctamente la transición de la entidad", "success");
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
        const idd = this.props.match.params.id;
        this.setState({ idd });
        axios.get(global.url + "tiposdocumentos", global.autentica).then(res => {
            let tidc = res.data;
            this.setState({ tidc });
        });
        var tabla2="aportantes/"+idd;
        axios.get(global.url + tabla2, global.autentica ).then((res) => {
            const dent = res.data;
            this.setState({ dent });
            console.log(dent);
        }); 
        axios.get(global.url + "reportes/filtro7/"+idd+"/1", global.autentica ).then((res) => {
            var tabe1 = res.data;
            /* let tabe2 =
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
            }*/
            this.setState({ tabe1 });
        }); 
        axios.get(global.url + "reportes/filtro7/"+idd+"/2", global.autentica ).then((res) => {
            var tabe2 = res.data;
            /*let tabe3 =
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
            }*/
            this.setState({ tabe2 });
        }); 
        axios.get(global.url + "documentosaportantes/transiciones/"+idd, global.autentica).then(res => {
            let tabe3 = res.data;
            this.setState({ tabe3 });
        });
    }
    dato = (rols) => { this.setState({ rols }); }
    render() {
        if(!cookies.get("idroles")){return <Redirect to="./"/>;}
        if (this.state.status === "Ok") { return <Redirect to="/aportantes" />; }
        const columnas = [
            {
                title: 'Registro', field: 'apo_fecha', sortable: true, type: 'date',
                render: row => <Moment format="DD MMM YYYY">{row["apo_fecha"]}</Moment>
            },
            { title: 'Clasificación', field: 'tid_clasifica', sortable: true },
            { title: 'Documento', field: 'tid_nombre', sortable: true },
            {
                title: 'Anexos', field: 'idc', sortable: false, width: "10%",
                render: row => (<Descargado docid={row["idc"]} />)
            }
        ]
        const columnas2 = [
            {
                title: 'Fecha', field: 'tra_fecha', sortable: true, type: 'date',
                render: row => <Moment format="DD MMM YYYY">{row["tra_fecha"]}</Moment>
            },
            { title: 'Tipo', field: 'tra_tipo', sortable: true },
            { title: 'Usuario', field: 'usu_nombre', sortable: true },
            {
              title: 'Soporte', field: 'idtransicionesaportantes', sortable: false, width: "10%",
              render: row => (<Descargado docid={row["idtransicionesaportantes"]} />)
            }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Documentos entidad aportante" />
                <div className="am-mainpanel">
                    <div className="card pd-20 pd-sm-40">
                    <div className='row fblanco2'>
                        <div className='col-lg-3 izqq1'>
                            <NavLink className="btn btn-secondary" to="/aportantes">Volver</NavLink>
                        </div>
                    </div>
                    {
                      this.state.dent.map((sin, i) => {
                        return (
                            <React.Fragment>
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
                            <div className='row'><div className='col-md-12'><br></br></div></div>
                            </React.Fragment>
                        )
                      })
                    }

                        <Script3 tabla={"documentosaportantes/aportante/" + this.props.match.params.id} devuelvedatos={this.dato} />
                        { cookies.get("idroles")==="1" || cookies.get("idroles")==="3"? (
                        <React.Fragment>
                            <EncTabla titulo="Anexos" link={"/Crearanex/" + this.state.idd} titulo2="Anexo" />
                            <Tabla tabla="documentosaportantes" columnas={columnas} valores={this.state.rols} 
                            redire="/aportantes" titulo="Documentos" link="/Editadoca/" />
                        </React.Fragment> ) : (
                        <React.Fragment>
                            <h6 className="card-body-title">Documentos</h6>
                            <Tabla3 tabla="documentosaportantes" columnas={columnas} valores={this.state.rols} 
                            redire="/aportantes" titulo="Documentos" link="/Editadoca/" />
                        </React.Fragment>
                        )
                        }
                    </div>
                    <div className='card pd-20 pd-sm-40'>
                    
                    <div className="row">
                        <div className="col-md-6 izqq griss">
                        <form  name="forma" onSubmit={this.guardar}>
                            { 
                            cookies.get("idroles")==="1" || cookies.get("idroles")==="3"? (
                                <React.Fragment>
                                <br></br>
                                <h6 className="card-body-title">Transiciones de la entidad</h6>
                                <Fila nombre="Tipo de cambio" refer="tipo" tipo="6" arreglo={this.state.tipos} />
                                <Fila nombre="Observaciones" refer="observacion" tipo="1" arreglo="" />
                                <div className="row">
                                    <div className="col-md-6 izqq">Soporte de modificación</div>
                                    <div className="col-md-6 derechas">
                                    <input type="file" className="form-control" onChange={this.handleImagePreview} name="docs_aportantes"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 izqq">
                                    </div>
                                    <div className="col-md-6 derechas"><br></br>
                                    <input type="submit" className="btn btn-info pd-x-20" onClick={this.handleSubmitFile} value="Guardar" />
                                    <br></br>
                                    </div>
                                </div>
                                </React.Fragment>):(<React.Fragment></React.Fragment>)
                            }
                            <div className='row'>
                                <div className='col-md-12'>
                                <h6 className="card-body-title">Transiciones en la entidad</h6>
                                <Tabla3 tabla="responsables" columnas={columnas2} valores={this.state.tabe3} 
                                redire="/aportantes" titulo="Transiciones" link="/editaresp/" />
                                </div>    
                            </div>
                        </form>
                        </div>
                        <div className="col-lg-6 izqq divacs">
                            <div className='row'>
                                <div className="col-lg-12 ">
                                <div className='griss'>
                                <h6 className="card-body-title">Cambios en clasificación por NIT</h6>
                                <br></br>
                                <div className='timeline'>
                                <div class="v-line"></div>
                                {
                                    this.state.tabe2.map((con, i) => {
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
                            </div><br></br>
                            <div className='row'>
                                <div className="col-lg-12 ">
                                <div className='griss'>
                                <h6 className="card-body-title">Clasificación por obligatoriedad</h6>
                                <br></br>
                                <div className='timeline'>
                                <div class="v-line"></div>
                                {
                                    this.state.tabe1.map((con, i) => {
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
                    </div>
                </div>
                <div className="modal-footer">
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default anexos;