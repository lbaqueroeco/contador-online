import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//login
import Login from '../components/login/Login';
import Inicio from '../components/login/Inicio';
import Error from '../layout/Error';

//usuarios
import Roles from '../components/usuarios/roles/Roles';
import Usuarios from '../components/usuarios/usuarios/Usuarios';
import Departamentos from '../components/usuarios/departamentos/Departamentos';
import Municipios from '../components/usuarios/municipios/Municipios';
import Paises from '../components/usuarios/paises/Paises';
import Territoriales from '../components/usuarios/territoriales/territoriales';
import Menus from '../components/usuarios/menus/Menus';
import Permisos from '../components/usuarios/permisos/permisos';

//Parametrizacion
import estNomina from '../components/parametrizacion/estNomina/estNomina';
import clasificaAportantes from '../components/parametrizacion/clasificaAportantes/clasificaAportantes';
import sectores from '../components/parametrizacion/sectores/sectores';
import tiposDocumentos from '../components/parametrizacion/tiposDocumentos/tiposDocumentos';
import tiposEntidades from '../components/parametrizacion/tiposEntidades/tiposEntidades';

//Aportantes
import sedes from '../components/aportantes/sedes/sedes';
import aportantes from '../components/aportantes/aportantes/aportantes';
import responsables from '../components/aportantes/aportantes/responsables';

//Reportes
import Reportes1 from '../components/reportes/Reportes1';
import Reportes2 from '../components/reportes/Reportes2';

//Crear
import Crearrol from '../components/usuarios/roles/Creaarrol';
import Crearusuario from '../components/usuarios/usuarios/Crearusuario';
import Crearpais from '../components/usuarios/paises/Crearpais';
import Creardpto from '../components/usuarios/departamentos/Creardpto';
import Crearmuni from '../components/usuarios/municipios/Crearmuni';
import Crearmenu from '../components/usuarios/menus/Crearmenu';
import Crearperm from '../components/usuarios/permisos/Crearperm';
import Crearterr from '../components/usuarios/territoriales/Crearterr';

import Crearestn from '../components/parametrizacion/estNomina/Crearestn';
import Crearcapo from '../components/parametrizacion/clasificaAportantes/Crearcapo';
import Crearsect from '../components/parametrizacion/sectores/Crearsect';
import Creartdoc from '../components/parametrizacion/tiposDocumentos/Creartdoc';
import Creartent from '../components/parametrizacion/tiposEntidades/Creartent';

import Crearsede from '../components/aportantes/sedes/Crearsede';
import Crearapor from '../components/aportantes/aportantes/Crearapor';
import Crearresp from '../components/aportantes/aportantes/Crearresp';

//Editar
import Editarol from '../components/usuarios/roles/Editarol';
import Editausuario from '../components/usuarios/usuarios/Editausuario';
import Editapais from '../components/usuarios/paises/Editapais';
import Editadpto from '../components/usuarios/departamentos/Editadpto';
import Editamuni from '../components/usuarios/municipios/Editamuni';
import Editamenu from '../components/usuarios/menus/Editamenu';
import Editaperm from '../components/usuarios/permisos/Editaperm';
import Editaterr from '../components/usuarios/territoriales/Editaterr';

import Editaestn from '../components/parametrizacion/estNomina/Editaestn';
import Editacapo from '../components/parametrizacion/clasificaAportantes/Editacapo';
import Editasect from '../components/parametrizacion/sectores/Editasect';
import Editatdoc from '../components/parametrizacion/tiposDocumentos/Editatdoc';
import Editatent from '../components/parametrizacion/tiposEntidades/Editatent';

import Editasede from '../components/aportantes/sedes/Editasede';
import Editaapor from '../components/aportantes/aportantes/Editaapor';
import Editaresp from '../components/aportantes/aportantes/Editaresp';

class Router extends Component {
    render() {
        return (
            
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login}></Route>
                    <Route path="/Inicio" component={Inicio}></Route>
                    <Route path="/Login" component={Login}></Route>  
                    <Route path="/Roles" component={Roles}></Route>
                    <Route path="/Usuarios" component={Usuarios}></Route>
                    <Route path="/Paises" component={Paises}></Route>
                    <Route path="/territoriales" component={Territoriales}></Route>
                    <Route path="/Departamentos" component={Departamentos}></Route>
                    <Route path="/Municipios" component={Municipios}></Route>
                    <Route path="/Menus" component={Menus}></Route>
                    <Route path="/permisos" component={Permisos}></Route>

                    <Route path="/EstructuraNomina" component={estNomina}></Route>
                    <Route path="/Clasificacion-aportantes" component={clasificaAportantes}></Route>
                    <Route path="/Tipos-entidades" component={tiposEntidades}></Route>
                    <Route path="/Sectores" component={sectores}></Route>
                    <Route path="/Tipos-docuemntos" component={tiposDocumentos}></Route>

                    <Route path="/sedes" component={sedes}></Route>
                    <Route path="/aportantes" component={aportantes}></Route>
                    <Route path="/responsables/:id" component={responsables}></Route>

                    <Route path="/reportes1" component={Reportes1}></Route>
                    <Route path="/reportes2" component={Reportes2}></Route>

                    <Route path="/Crearrol" component={Crearrol}></Route>
                    <Route path="/Crearusuario" component={Crearusuario}></Route>
                    <Route path="/Creardpto" component={Creardpto}></Route>
                    <Route path="/Crearmuni" component={Crearmuni}></Route>
                    <Route path="/Crearpais" component={Crearpais}></Route>
                    <Route path="/Crearmenu" component={Crearmenu}></Route>
                    <Route path="/Crearperm" component={Crearperm}></Route>
                    <Route path="/Crearterr" component={Crearterr}></Route>

                    <Route path="/Crearestn" component={Crearestn}></Route>
                    <Route path="/Crearcapo" component={Crearcapo}></Route>
                    <Route path="/Crearsect" component={Crearsect}></Route>
                    <Route path="/Creartdoc" component={Creartdoc}></Route>
                    <Route path="/Creartent" component={Creartent}></Route>

                    <Route path="/Crearsede" component={Crearsede}></Route>
                    <Route path="/Crearapor" component={Crearapor}></Route>
                    <Route path="/Crearresp/:id" component={Crearresp}></Route>

                    <Route path="/Editarol/:id" component={Editarol}></Route>
                    <Route path="/Editausuario/:id" component={Editausuario}></Route>
                    <Route path="/Editadpto/:id" component={Editadpto}></Route>
                    <Route path="/Editamuni/:id" component={Editamuni}></Route>
                    <Route path="/Editapais/:id" component={Editapais}></Route>
                    <Route path="/Editamenu/:id" component={Editamenu}></Route>
                    <Route path="/Editaperm/:id" component={Editaperm}></Route>
                    <Route path="/Editaterr/:id" component={Editaterr}></Route>

                    <Route path="/Editaestn/:id" component={Editaestn}></Route>
                    <Route path="/Editacapo/:id" component={Editacapo}></Route>
                    <Route path="/Editasect/:id" component={Editasect}></Route>
                    <Route path="/Editatdoc/:id" component={Editatdoc}></Route>
                    <Route path="/Editatent/:id" component={Editatent}></Route>

                    <Route path="/Editasede/:id" component={Editasede}></Route>
                    <Route path="/Editaapor/:id" component={Editaapor}></Route>
                    <Route path="/Editaresp/:id" component={Editaresp}></Route>

                    <Route component={Error}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;