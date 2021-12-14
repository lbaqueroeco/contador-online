import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

class EncTabla extends Component {
    render() {
        const titul = this.props.titulo;
        const titu2 = this.props.titulo2;
        const link = this.props.link;
        return (
            <React.Fragment>
                <h6 className="card-body-title">{titul}</h6>
                <NavLink className="btn1 botones1" to={link}>
                <i className="icon ion-plus-circled"></i> Agregar {titu2}</NavLink><br />
            </React.Fragment>
        )
    }
}
export default EncTabla;




