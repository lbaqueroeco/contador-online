import React, { Component } from 'react'

class Titulo2 extends Component {
    render() {
        const titul = this.props.titulo;
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-lg-12">
                        <h6 className="titul2">{titul}</h6><br></br>
                    </div>
                </div>    
            </React.Fragment>
        )
    }
}
export default Titulo2;
