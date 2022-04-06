import React, { Component } from 'react';
import axios from 'axios';
import global from '../../../Global';
import Descarga from '../../../comunes/descargardocs1';
import Salarials from '../../../helpers/Factoresselmul';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class FiltrosConsulta extends Component {
    Departamento = React.createRef(); 
    Territorial = React.createRef();
    Macrozona = React.createRef();
    state = { tabe:[], role:[], estn:[], sect:[], dept:[], ciud:[], macr:[], oren:[],
        terr:[], status: null, estado:"", reportes:['Aportantes por Territorial',
        'Aportantes por Municipio', 'Aportantes por Orden', 'Aportantes por Clasificación',
        'Aportantes por Factores salariales'], lineas:['Documentos de trabajo', 
        'Documentos de identificación', 'Enlaces']  };
    componentDidMount() {
        axios.get(global.url + "clasificacionesaportantes", global.autentica)
        .then(res => {
            let role = res.data;
            this.setState({ role });
        });
        axios.get(global.url + "estructuranomnina", global.autentica)
        .then(res => {
            let estn = res.data;
            this.setState({ estn });
        });
        axios.get(global.url + "sectores", global.autentica)
        .then(res => {
            let sect = res.data;
            this.setState({ sect });
        });
        axios.get(global.url + "tipoadscrita", global.autentica)
        .then(res => {
            let oren = res.data;
            this.setState({ oren });
        });
        axios.get(global.url + "aportantes/territoriales/macro", global.autentica)
        .then(res => {
            let macr = res.data;
            this.setState({ macr });
        });
        axios.get(global.url + "aportantes/territoriales/terri", global.autentica)
        .then(res => {
            let terr = res.data;
            this.setState({ terr });
        });
        axios.get(global.url + "departamentos", global.autentica)
        .then(res => {
            let dept = res.data;
            dept =  dept.map( (p) => { p['id'] = p.iddepartamentos; p[`nombre`] = p.dep_nombre; return p; });
            this.setState({ dept });
            this.llenamun();
        });
        this.arma();
    }
    llenater = () =>{
        var iddep = this.Macrozona.current.value;
        if(iddep==="Macrozona I"){ iddep="1"; }
        if(iddep==="Macrozona II"){ iddep="2"; }
        if(iddep==="Macrozona III"){ iddep="3"; }
        axios.get(global.url+"aportantes/territoriales/macro/"+ iddep, global.autentica)
        .then(res => {
            const terr = res.data;
            this.setState({ terr });
            this.arma();
        });
    }
    llenadep = () =>{
        const idter = this.Territorial.current.value;
        axios.get(global.url+"aportantes/territoriales/depar/"+ idter, global.autentica)
        .then(res => {
            const dept = res.data;
            this.setState({ dept });
            this.arma();
        });
    }
    llenamun = () =>{
        const iddep = this.Departamento.current.value;
        const srep = this.props.titulo;
        var ruta=global.url+"ciudades/departamento/"+ iddep;
        if(srep==="tres"){ ruta=global.url+"aportantes/departamento/"+ iddep; }
        axios.get(ruta, global.autentica)
        .then(res => {
            const ciud = res.data;
            this.setState({ ciud });
            this.arma();
        });
    }
    arma = () =>
    {
      var clap=document.forma.clap.value;
      var estn=document.forma.estn.value;
      var sect=document.forma.sect.value;
      var macr=document.forma.macro.value;
      if(macr==="Macrozona"){ macr="0"; }
      if(macr==="Macrozona I"){ macr=1; }
       if(macr==="Macrozona II"){ macr=2; }
      else if(macr==="Macrozona III"){ macr=3; }
      if(cookies.get("idroles")==="8"){ macr=cookies.get("usu_idmacrozona"); }
      var terr=document.forma.terr.value;
      if(terr==="Territorial"){ terr="0"; }
      if(cookies.get("idroles")==="24"){ terr=cookies.get("usu_idterritorial"); }

      var dept=document.forma.depa.value;
      if(dept==="Departamento"){ dept="0"; }
      var muni=document.forma.ciud.value;
      if(muni==="Municipio"){ muni="0"; }
      const srep = this.props.titulo;
      var orde=document.forma.orde.value;
      if(orde==="Aportantes por Territorial"){ orde="1"; } 
      else if(orde==="Aportantes por Municipio"){ orde="2"; } 
      else if(orde==="Aportantes por Orden"){ orde="3"; } 
      else if(orde==="Aportantes por Clasificación"){ orde="4"; } 
      else if(orde==="Aportantes por Factores salariales"){ orde="5"; } 
      else if(orde==="Documentos de trabajo"){ orde="6"; } 
      else if(orde==="Documentos de identificación"){ orde="7"; } 
      else if(orde==="Enlaces"){ orde="8"; } 
      else { orde="1"; } 
      var orap=document.forma.oren.value;

      var ruta="aportantes/filtros2/"+sect+"/"+estn+"/"+clap+"/"+macr+"/"+terr+"/"+dept+"/"+muni+"/"+orap;
      if(srep==="dos"){
        ruta="reportes/filtro3/"+sect+"/"+estn+"/"+clap+"/"+macr+"/"+terr+"/"+dept+"/"+muni+"/"+orde+"/"+orap;
        axios.get(global.url + ruta, global.autentica ).then((res) => {
            var tabe = res.data;
            this.setState({ tabe });
            this.props.devuelvedatos(tabe);
            let tabe1 = [['', 'Cantidad']]
            for (var i=0; i<tabe.length; i+=1) {
                var valor=tabe[i].cuenta*10;
                tabe1.push([tabe[i].nombre, valor]);
            }
            this.setState({ tabe1 });
            this.props.devuelvedatos2(tabe1);
        }); 
      }
      else if(srep==="tres")
      {
        ruta="reportes/filtro4/"+sect+"/"+estn+"/"+clap+"/"+macr+"/"+terr+"/"+dept+"/"+muni+"/"+orde+"/"+orap;
        axios.get(global.url + ruta, global.autentica ).then((res) => {
            var tabe = res.data;
            this.setState({ tabe });
            this.props.devuelvedatos(tabe);
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
            this.props.devuelvedatos2(tabe1);
        }); 
      }
      else {
        axios.get(global.url + ruta, global.autentica ).then((res) => {
            var tabe = res.data;
            this.setState({ tabe });
            this.props.devuelvedatos(tabe);
        }); 
      }
    }
    render() {
        return (
            <React.Fragment>
                <h6 className="card-body-title">Seleccione sus preferencias</h6>
                <form name="forma">
                <div className="row">
                    {
                        this.props.titulo==="dos"?
                        (
                            <div className="col-lg-3">
                            <select name="orde" className="form-control" onChange={this.arma}>
                                <option value="0">Reporte</option>
                                {
                                    this.state.reportes.map((cons, i) => {
                                    return (
                                            <option key={i} value={cons}>{cons}</option> ) 
                                    })
                                }
                            </select>
                        </div>
                        ) :
                        this.props.titulo==="tres"?
                        (
                            <div className="col-lg-3">
                            <select name="orde" className="form-control" onChange={this.arma}>
                                <option value="0">Líneas de tiempo</option>
                                {
                                    this.state.lineas.map((cons, i) => {
                                    return (
                                            <option key={i} value={cons}>{cons}</option> ) 
                                    })
                                }
                            </select>
                        </div>
                        ) : (
                            <React.Fragment>
                                <input type='hidden' name='orde'/>
                            </React.Fragment>
                        )
                    }
                    <div className="col-lg-3">Clasificación por obligatoriedad<br></br>
                        <select name="clap" className="form-control" onChange={this.arma}>
                            <option value="0">Seleccione</option>
                            {
                                this.state.role.map((arr, i) => {
                                return (
                                        <option key={i} value={arr.idclasificaaportantes}>{arr.cla_nombre} </option> ) 
                                })
                            }
                        </select>
                    </div>
                    <div className="col-lg-3">Factores Salariales<br></br>
                    <Salarials />
                        <input type="hidden" name="estn" value="0"/>
                        {/*<select name="estn" className="form-control" onChange={this.arma}>
                            <option value="0">Factores salariales</option>
                            
                                this.state.estn.map((arr, i) => {
                                return (
                                        <option key={i} value={arr.idestructuranomina}>{arr.est_nombre} </option> ) 
                                })
                            
                            </select>*/}
                    </div>
                    <div className="col-lg-3">Clasificación por tipo de NIT<br></br>
                        <select name="sect" className="form-control" onChange={this.arma}>
                            <option value="0">Seleccione</option>
                            {
                                this.state.sect.map((arr, i) => {
                                return (
                                        <option key={i} value={arr.idsectores}>{arr.sec_nombre} </option> ) 
                                })
                            }
                        </select>
                    </div>
                    <div className="col-lg-3">Orden de las entidades<br></br>
                        <select name="oren" className="form-control" onChange={this.arma}>
                            <option value="0">Seleccione</option>
                            {
                                this.state.oren.map((arr, i) => {
                                return (
                                        <option key={i} value={arr.idtipoadscrita}>{arr.tad_descripcion} </option> ) 
                                })
                            }
                        </select>
                    </div>
                    <div className="col-lg-3">
                        <select className="form-control" ref={this.Macrozona} 
                        name="macro" onChange={this.llenater} required>
                            <option vaule="0">Macrozona</option>
                            {
                                    this.state.macr.map((con, i) => {
                                    return (
                                        <option key={i} value={con.ter_macrozona}>{con.ter_macrozona} </option> ) 
                                    })
                                }
                        </select>
                    </div>
                    <div className="col-lg-3">
                        <select className="form-control" ref={this.Territorial} 
                        name="terr" onChange={this.llenadep} required>
                            <option vaule="0">Territorial</option>
                            {
                                    this.state.terr.map((con, i) => {
                                    return (
                                        <option key={i} value={con.idterritorial}>{con.ter_nombre} </option> ) 
                                    })
                            }
                        </select>
                    </div>
                    <div className="col-lg-3">
                        <select className="form-control" ref={this.Departamento} 
                        name="depa" onChange={this.llenamun} required>
                            <option vaule="0">Departamento</option>
                            {
                                    this.state.dept.map((con, i) => {
                                    return (
                                        <option key={i} value={con.iddepartamentos}>{con.dep_nombre} </option> ) 
                                    })
                                }
                        </select>
                    </div>
                    <div className="col-lg-3">
                        <select className="form-control" ref="Municipio" onChange={this.arma} name="ciud">
                            <option vaule="0">Municipio</option>
                            {
                                    this.state.ciud.map((con, i) => {
                                    return (
                                        this.props.titulo==="tres"?
                                        (<option key={i} value={con.idaportantes}>{con.apo_nombre} </option> ) :
                                        ( <option key={i} value={con.idciudades}>{con.ciu_nombre} </option> )
                                        )    

                                    })
                            }
                        </select>
                    </div>
                    {
                        this.props.titulo==="uno"?
                        (
                            <React.Fragment>
                                <div className="col-lg-12 derechas" style={{top:"5px"}}>
                                <input type='button' className="btn btn-primary" onClick={this.arma} value='Consultar' />
                                &nbsp;&nbsp;&nbsp;<Descarga/>
                                </div>
                            </React.Fragment>
                        ) :
                        ( <div></div> )
                    }
                </div>
                <br></br>
                </form>
            </React.Fragment>
        )
    }
}
export default FiltrosConsulta;