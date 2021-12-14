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

class Reportes1 extends Component {
    state = {
        tabe1: [],
        tabe2:[],
        tabe3:[],
    };
    componentDidMount(){
        axios.get(global.url+"vista_siniestros/Reporte1", global.autentica)
        .then(res => {
            var viene = res.data;
            let tabe1 = [['Tipo de siniestro', 'Cantidad']]
            for (var i=0; i<viene.length; i+=1) {
                tabe1.push([viene[i].sin_tipoatep, viene[i].valor]);
            }
            this.setState({ tabe1 });
        });

        axios.get(global.url+"vista_siniestros/Reporte2", global.autentica)
        .then(res => {
            var viene2 = res.data;
            let tabe2 = [['Causal', 'Siniestros']]
            for (var i=0; i<viene2.length; i+=1) {
                tabe2.push([viene2[i].sin_causal, viene2[i].valor]);
            }
            this.setState({ tabe2 });
        });

        axios.get(global.url+"vista_siniestros/Reporte3", global.autentica)
        .then(res => {
            var viene3 = res.data;
            let tabe3 = [['Severidad', 'Siniestros']]
            for (var i=0; i<viene3.length; i+=1) {
                tabe3.push([viene3[i].sin_severidad, viene3[i].valor]);
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
                    <h5 className="am-title">Reportes de operación</h5>
                </div>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <div className="row">
                                <div className="col-md-6">
                        <Chart width={'500px'} height={'300px'} chartType="PieChart"
                        loader={<div>Loading Chart</div>} 
                        data={this.state.tabe1} options={{ title: 'Siniestros reportados por tipo', }}
                        rootProps={{ 'data-testid': '1' }}/>          
                        <div style={{ display: 'flex', maxWidth: 900 }}>
                                </div>
                                <div className="col-md-6">
                        <Chart
                            width={400} height={300} chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.tabe2}
                            options={{title: 'Causal de accidentes laborales', chartArea: { width: '95%' },
                            legend: { position: 'none' }}}
                        legendToggle />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                        <Chart
                            width={400} height={300} chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.tabe3}
                            options={{
                            title: 'Severidad de siniestros', chartArea: { width: '95%' },
                            legend: { position: 'none' }, colors: ['#FB7A21'], isStacked: true
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
export default Reportes1;