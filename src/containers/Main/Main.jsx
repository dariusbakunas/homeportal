import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router';
import PrivateRoute from '../Auth/PrivateRoute';
import Dashboard from '../Dashboard';
import Callback from '../Auth/Callback';

class Main extends Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <PrivateRoute path="/" exact component={Dashboard}/>
                    <Route path="/callback" component={Callback}/>
                </Switch>
            </React.Fragment>
        )
    }
}

export default Main;