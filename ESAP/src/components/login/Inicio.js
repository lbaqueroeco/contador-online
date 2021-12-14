import React, { Component } from 'react';
import Header from '../../layout/Header';
import Menulat from '../../layout/Menulat';
import Footer from '../../layout/Footer';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

const cookies = new Cookies(); 

class Inicio extends Component {
    state = {
    };
    componentDidMount(){
    }
    render() {
        if(!cookies.get("idroles"))
        {
            return <Redirect to="./"/>;
        }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-pagetitle">
                    <h5 className="am-title">Gestion de la información de los ingresos de la ley 21 de 1982</h5>
                </div>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Inicio;