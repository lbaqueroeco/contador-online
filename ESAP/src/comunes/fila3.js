import React, { Component } from 'react'
class Fila3 extends Component {
    render() {
        const valor = this.props.valor;
        const nombre = this.props.nombre;
        var ancho = this.props.ancho;
        return (
            <div className={ancho}><b>{nombre}: </b>{valor}</div>
        )
    }
}
export default Fila3;
