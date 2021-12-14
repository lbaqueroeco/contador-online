import React, { Component } from 'react';
import axios from 'axios';
import global from '../../../Global';

class FiltrosConsulta extends Component {
    Departamento = React.createRef(); 
    state = { tabe:[], role:[], estn:[], sect:[], dept:[], ciud:[], status: null, estado:"" };
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
        axios.get(global.url + "departamentos", global.autentica)
        .then(res => {
            let dept = res.data;
            dept =  dept.map( (p) => { p['id'] = p.iddepartamentos; p[`nombre`] = p.dep_nombre; return p; });
            this.setState({ dept });
            this.llenamun();
        });
        this.arma();
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
      var dept=document.forma.depa.value;
      if(dept==="Departamento"){ dept="0"; }
      var muni=document.forma.ciud.value;
      if(muni==="Municipio"){ muni="0"; }
      axios.get(global.url + "aportantes/filtros/"+clap+"/"+estn+"/"+sect+"/"+dept+"/"+muni, 
      global.autentica ).then((res) => {
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
                    <div className="col-lg-4">Clasificación aportantes
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
                    <div className="col-lg-4">Estructura nómina
                        <select name="estn" className="form-control" onChange={this.arma}>
                            <option value="0">Seleccione...</option>
                            {
                                this.state.estn.map((arr, i) => {
                                return (
                                        <option key={i} value={arr.idestructuranomina}>{arr.est_nombre} </option> ) 
                                })
                            }
                        </select>
                    </div>
                    <div className="col-lg-4">Sectores
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
                    <div className="col-lg-4">
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
                    <div className="col-lg-4">
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
                </div>
                <br></br>
                </form>
            </React.Fragment>
        )
    }
}
export default FiltrosConsulta;