import React, { Component } from 'react'
import MaterialTable from 'material-table';
import definiciones from './definiciones';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { eliminar } from '../scripts/scripts';

class Tabla extends Component {
    elimina  = (id) =>{  eliminar(this.props.tabla, "Departamento", id); }
    render() {
        const titul = this.props.titulo;
        const link = this.props.link;
        const columnas = this.props.columnas;
        const valores = this.props.valores;
        return (
            <MaterialTable columns={columnas} data={valores} 
                title={titul}
                actions={[
                {
                    icon: () => <Edit />,
                    tooltip: 'Editar',
                    onClick: (event, rowData)=>{document.location.href=link + rowData.idc}
                },
                {
                    icon: () => <DeleteOutline />,
                    tooltip: 'Eliminar', 
                    onClick: (event, rowData)=>this.elimina(rowData.idc)
                }
                ]}
                options={{ actionsColumnIndex: -1 }}
                localization={{ header:{ actions: 'Acciones'}}}
                icons={definiciones}
            ></MaterialTable> 
        )
    }
}
export default Tabla;
