import React, {Component} from 'react';
import About from './about';
import Abajo from './abajo';

class Main extends Component {
    componentDidMount() {}
    render(){
        return (
            <React.Fragment>
                <About/>
                <Abajo/>
            </React.Fragment>
        )
    }
}
export default Main;