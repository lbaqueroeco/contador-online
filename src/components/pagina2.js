import React, {Component} from 'react';
import global from '../Global';
import axios from 'axios';

class PAgina2 extends Component {
    state = { spon: []  }
    llena(){
        axios.get(global.url+"sponsors")
        .then(res => {
            const spon = res.data;
            this.setState({ spon });
        }).catch(() =>{
        });
    }
    componentDidMount() {
        this.llena();
    }
    render(){
        return (
            <React.Fragment>
                <p>
                Esta es la pagina dos</p>
                {
                            this.state.spon.map((arr, i) => {
                                return (
                                    <div className="sponsor big">{arr.name}<br></br></div>
                                    )
    
                            })
                        }

            </React.Fragment>
        )
    }
}
export default PAgina2;