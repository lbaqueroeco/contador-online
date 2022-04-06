import React, { Component } from 'react'
import MaterialTable from 'material-table';
import definiciones from './definiciones';
import Edit from '@material-ui/icons/Edit';
import { Redirect } from 'react-router-dom';

import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { eliminar } from '../scripts/scripts';
import Cookies from 'universal-cookie';

const cookies = new Cookies(); 
class Tabla extends Component {
    state = { direc: "", status: null };
    elimina  = (id) =>{  
        eliminar(this.props.tabla, "Departamento", id, this.props.redire);
        cookies.set("destino", this.props.tabla, {path:"/"});
        this.setState({ status: 'Ok'})
    }
    enviar = (id) => { this.setState({ direc: id }) }
    render() {
        if(this.state.status==="Ok"){return <Redirect to={"/navigate"}/>;}
        const titul = this.props.titulo;
        const link = this.props.link;
        const columnas = this.props.columnas;
        const valores = this.props.valores;
        if(this.state.direc!==""){return <Redirect to={this.state.direc}/>;}
        return (
            <MaterialTable columns={columnas} data={valores} 
                title={titul} style={{"padding": "1px 1px 1px 1px", "font-size": "12px"}}
                actions={[
                {
                    icon: () => <Edit style={{"transform":"scale(0.8)"}} />,
                    tooltip: 'Editar',
                    onClick: (event, rowData)=>{
                        this.enviar(link + rowData.idc);
                    }
                },
                {
                    icon: () => <DeleteOutline  style={{"transform":"scale(0.8)"}} />,
                    tooltip: 'Eliminar', 
                    onClick: (event, rowData)=>this.elimina(rowData.idc)
                }
                ]}
                options={{ actionsColumnIndex: -1 }}
                localization={{ header:{ actions: 'Acciones'}}}
                icons={definiciones}
                rowsPerPageOptions={[25, 50, 100]}
            ></MaterialTable> 
        )
    }
}
export default Tabla;
