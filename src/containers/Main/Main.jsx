import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';
import Login from '../Login';
import Dashboard from '../Dashboard';

class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={() => (
                        !this.props.isLoggedIn ? (
                            <Redirect to="/login"/>
                        ) : (
                            <Dashboard/>
                        )
                    )}/>
                    <Route path="/login" component={Login}/>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    };
};

export default withRouter(connect(mapStateToProps)(Main));