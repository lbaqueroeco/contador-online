import React, { Component } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

class Menulat extends Component {
    render() {
        return (
            <div className="am-sideleft colorback">
                <ul className="nav am-sideleft-tab colorback">
                    <li className="nav-item">
                        <NavLink to="/Inicio" className="nav-link active">
                            <i className="icon ion-ios-home-outline tx-24"></i>
                        </NavLink>
                    </li>
                </ul>
                <div className="tab-content">
                    <div id="mainMenu" className="tab-pane active">
                        <ProSidebar>
                            <Menu iconShape="square">
                                {
                                    cookies.get("idroles")==="1"?
                                    (
                                        <React.Fragment>
                                        <SubMenu title="Configuración" icon={<i className="icon ion-ios-gear-outline"></i>} >
                                            <MenuItem><NavLink to='/Roles'>Roles</NavLink></MenuItem>
                                            <MenuItem><NavLink to='/Usuarios'>Usuarios</NavLink></MenuItem>
                                            <MenuItem><NavLink to='/Menus'>Menus</NavLink></MenuItem>
                                            <MenuItem><NavLink to='/Permisos'>Permisos</NavLink></MenuItem>
                                            <MenuItem><NavLink to='/Paises'>Paises</NavLink></MenuItem>
                                            <MenuItem><NavLink to='/territoriales'>Territoriales</NavLink></MenuItem>
                                            <MenuItem><NavLink to='/Departamentos'>Departamentos</NavLink></MenuItem>
                                            <MenuItem><NavLink to='/Municipios'>Municipios</NavLink></MenuItem>
                                        </SubMenu>
                                        <SubMenu title="Parametrización" icon={<i className="icon ion-ios-filing-outline"></i>} >
                                            <MenuItem><NavLink to='/EstructuraNomina'>Estructura nómina</NavLink></MenuItem>
                                            <MenuItem><NavLink to='/Clasificacion-aportantes'>Clasificación aportantes</NavLink></MenuItem>
                                            <MenuItem><NavLink to='/Tipos-entidades'>Tipos entidades</NavLink></MenuItem>
                                            <MenuItem><NavLink to='/Sectores'>Sectores</NavLink></MenuItem>
                                            <MenuItem><NavLink to='/Tipos-docuemntos'>Tipos Documentos</NavLink></MenuItem>
                                        </SubMenu>
                                        </React.Fragment>
                                ):(
                                        <React.Fragment></React.Fragment>
                                    )
                                }
                                {
                                    cookies.get("idroles")==="1" || cookies.get("idroles")==="3"?
                                    (
                                        <SubMenu title="Aportantes" icon={<i className="icon fa fa-dollar"></i>} >
                                            <MenuItem><NavLink to='/sedes'>Sedes</NavLink></MenuItem>
                                            <MenuItem><NavLink to='/aportantes'>Entidades Aportantes</NavLink></MenuItem>
                                        </SubMenu>
                                    ):
                                    cookies.get("idroles")==="2"?
                                    (
                                        <SubMenu title="Aportantes" icon={<i className="icon fa fa-ambulance"></i>} >
                                            <MenuItem><NavLink to='/aportantes'>Aportantes</NavLink></MenuItem>
                                        </SubMenu>
                                    )
                                    :(
                                        <React.Fragment></React.Fragment>
                                    )
                                }
                                <SubMenu title="Reportes" icon={<i className="icon ion-pie-graph"></i>} >
                                    <MenuItem><NavLink to='/Reportes1'>Consulta Aportantes (F-V)</NavLink></MenuItem>
                                    <MenuItem><NavLink to='/Reportes2'>Consulta Aportes (F-V)</NavLink></MenuItem>
                                </SubMenu>
                                <MenuItem icon={<i className="icon ion-close"></i>}>
                                    <NavLink to='/'>Salir</NavLink>
                                </MenuItem>
                            </Menu>
                        </ProSidebar>


                    </div>
                </div>
            </div>
        );
    }
}

export default Menulat;