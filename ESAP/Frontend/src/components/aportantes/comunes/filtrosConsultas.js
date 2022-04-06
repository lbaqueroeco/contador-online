import React, { Component } from 'react';
import axios from 'axios';
import global from '../../../Global';
import Descarga from '../../../comunes/descargardocs1';
import { NavLink } from 'react-router-dom';
import Salarials from '../../../helpers/Factoresselmul';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
class FiltrosConsulta extends Component {
    Departamento = React.createRef(); 
    Territorial = React.createRef();
    Macrozona = React.createRef();
    state = { tabe:[], role:[], estn:[], sect:[], dept:[], ciud:[], macr:[], terr:[], oren:[], status: null, estado:"" };
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
        axios.get(global.url + "departamentos", global.autentica)
        .then(res => {
            let dept = res.data;
            dept =  dept.map( (p) => { p['id'] = p.iddepartamentos; p[`nombre`] = p.dep_nombre; return p; });
            this.setState({ dept });
            this.llenamun();
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
        axios.get(global.url+"ciudades/departamento/"+ iddep, global.autentica)
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
      var orap=document.forma.oren.value;

      var ruta="aportantes/filtros2/"+sect+"/"+estn+"/"+clap+"/"+macr+"/"+terr+"/"+dept+"/"+muni+"/"+orap;
      axios.get(global.url + ruta, global.autentica ).then((res) => {
          var tabe = res.data;
          this.setState({ tabe });
          this.props.devuelvedatos(tabe);
      }); 
    }
    render() {
        const titul = this.props.titulo;
        //const estado = this.props.estado;
        return (
            <React.Fragment>
                <h6 className="card-body-title">{titul}</h6>
                <form name="forma">
                <div className="row">
                    <div className="col-lg-3">Clasificación por obligatoriedad 
                        <select name="clap" className="form-control" onChange={this.arma}>
                            <option value="0">Seleccione...</option>
                            {
                                this.state.role.map((arr, i) => {
                                return (
                                        <option key={i} value={arr.idclasificaaportantes}>{arr.cla_nombre} </option> ) 
                                })
                            }
                        </select>
                    </div>
                    <div className="col-lg-3">Factores salariales
                        <Salarials />
                        <input type="hidden" name="estn" value="0"/>
                        {/*<select name="estn" className="form-control" onChange={this.arma}>
                            <option value="0">Seleccione...</option>
                            
                                this.state.estn.map((arr, i) => {
                                return (
                                        <option key={i} value={arr.idestructuranomina}>{arr.est_nombre} </option> ) 
                                })
                            
                            </select>*/}
                    </div>
                    <div className="col-lg-3">Tipo de NIT
                        <select name="sect" className="form-control" onChange={this.arma}>
                            <option value="0">Seleccione...</option>
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
                    <div className="col-lg-3">Macrozonas
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
                    <div className="col-lg-3">Territoriales
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

                    <div className="col-lg-3">Departamentos
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
                    <div className="col-lg-3">Ciudades
                        <select className="form-control" ref="Municipio" onChange={this.arma} name="ciud">
                            <option vaule="0">Municipio</option>
                            {
                                    this.state.ciud.map((con, i) => {
                                    return (
                                        <option key={i} value={con.idciudades}>{con.ciu_nombre} </option> )
                                    })
                                }
                        </select>
                    </div>
                    <div className='col-lg-12 derechas' style={{top:"5px"}}><br></br>
                        <Descarga/>&nbsp;
                        <NavLink to="descarga_txt" target="_blank" className="btn btn-primary">Generar TXT</NavLink>

                    </div>
                </div>
                <br></br>
                </form>
            </React.Fragment>
        )
    }
}
export default FiltrosConsulta;