import React, { Component } from 'react';
import Header from '../../layout/Header';
import Menulat from '../../layout/Menulat';
import Footer from '../../layout/Footer';
import global from '../../Global';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import Chart from "react-google-charts";
import axios from 'axios';

const cookies = new Cookies(); 

class Reportes2 extends Component {
    state = {
        tabe1: [],
        tabe2:[],
        tabe3:[]
    };
    componentDidMount(){
        axios.get(global.url+"reservasas/Reporte4", global.autentica)
        .then(res => {
            var viene = res.data;
            let tabe1 = [['Estado', 'Valor']]
            for (var i=0; i<viene.length; i+=1) {
                tabe1.push([viene[i].res_estado, viene[i].valor]);
            }
            this.setState({ tabe1 });
        });

        axios.get(global.url+"reservasas/Reporte5", global.autentica)
        .then(res => {
            var viene2 = res.data;
            let tabe2 = [['Estado', 'Siniestros']]
            for (var i=0; i<viene2.length; i+=1) {
                tabe2.push([viene2[i].res_estado, viene2[i].valor]);
            }
            this.setState({ tabe2 });
        });

        axios.get(global.url+"vista_autorizaciones/Reporte6", global.autentica)
        .then(res => {
            var viene3 = res.data;
            let tabe3 = [['Descripción', 'Valor autorización']]
            for (var i=0; i<viene3.length; i+=1) {
                tabe3.push([viene3[i].ser_descripcion, viene3[i].valor]);
            }
            this.setState({ tabe3 });
        });
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
                    <h5 className="am-title">Reportes de autorizaciones</h5>
                </div>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <div className="row">
                                <div className="col-md-6">
                        <Chart width={'500px'} height={'300px'} chartType="PieChart"
                        loader={<div>Loading Chart</div>} 
                        data={this.state.tabe1} options={{ title: 'Estado de siniestros reportados' }}
                        rootProps={{ 'data-testid': '1' }}/>          
                        <div style={{ display: 'flex', maxWidth: 900 }}>
                                </div>
                                <div className="col-md-6">
                        <Chart width={400} height={300} chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={this.state.tabe2}
                        options={{ title: 'Valor de los siniestros reportados', chartArea: { width: '95%' }}}
                        legendToggle/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                        <Chart width={400} height={300} chartType="ColumnChart"
                            loader={<div>Loading Chart</div>} data={this.state.tabe3}
                            options={{ title: 'Valor de las autorizaciones', chartArea: { width: '95%' },
                            legend: { position: 'none' }, colors: ['#FB7A21'],
                        }}
                            
                            legendToggle />
                        <div style={{ display: 'flex' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            </div>
        );
    }
}
export default Reportes2;