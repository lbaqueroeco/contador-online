import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/main';
import Pagina2 from './components/pagina2';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Main}></Route>
                    <Route exact path="/pagina2" component={Pagina2}></Route>
                    <Route component={Error}></Route> 
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;