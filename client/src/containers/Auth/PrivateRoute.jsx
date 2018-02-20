import React from 'react';
import PrivateWrapper from './PrivateWrapper';
import { Route } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <PrivateWrapper>
            <Component {...props}/>
        </PrivateWrapper>
    )}/>
);

export default PrivateRoute;