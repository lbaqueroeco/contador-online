import React, { Component } from 'react';
import axios from 'axios';
import global from '../Global';
class Script2 extends Component {
    state = { idc: "", tabla:"" };
    componentDidMount(){ this.marcar(); }
    marcar = () => {
        const tabla = this.props.tabla;
        axios.get(global.url + tabla + "/" + this.props.id, global.autentica)
        .then(res => {
            const rols = res.data;
            this.props.devuelvedatos(rols);
        });
    }
    render() { 
        return( <div></div>) 
    }
}
export default Script2;