import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Loader, Dimmer } from 'semantic-ui-react'
import withAuthContext from '../../HOC/withAuthContext';

export class Callback extends Component {
    state = {
      error: false,
    };

    componentDidMount() {
      this.props.authContext.handleAuth(this.props.location.hash)
        .then(() => {
          this.props.history.push(this.getReturnUrl());
        })
        .catch((err) => {
          this.error = err;
        });
    }

    getReturnUrl = () => {
      return localStorage.getItem('return_url');
    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.authContext.isAuthenticated) {
        this.props.history.push(this.getReturnUrl());
      }
    }

    render() {
        return (
          !this.state.error ?
            <Dimmer active>
              <Loader indeterminate>Loading...</Loader>
            </Dimmer> :
            <div>Error occurred</div>
        );
    }
}

export default withAuthContext(withRouter(Callback));
