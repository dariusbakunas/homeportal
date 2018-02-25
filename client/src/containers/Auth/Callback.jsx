import React, { Component } from 'react';
import {connect} from "react-redux";
import { withRouter } from 'react-router';
import * as actions from "../Main/actions";
import { loadAuthInfo } from '../../utils/localStorage';
import { Loader, Dimmer } from 'semantic-ui-react'

// import loading from './loading.svg';

export class Callback extends Component {
    componentDidMount() {
      const authInfo = loadAuthInfo();

      if (authInfo) {
        // if local storage still has valid auth info use that instead
        const {fullName, accessToken, idToken, expiresAt} = authInfo;
        this.props.actions.loginSuccess(fullName, accessToken, idToken, expiresAt);
      } else {
        this.props.actions.handleAuth(this.props.location.hash);
      }
    }

    render() {
        return (
          <Dimmer active>
            <Loader indeterminate>Loading...</Loader>
          </Dimmer>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            handleAuth: (locationHash) => {
                dispatch(actions.handleAuth.request(locationHash))
            },
            loginSuccess: (fullName, accessToken, idToken, expiresAt) => {
              dispatch(actions.login.success(fullName, accessToken, idToken, expiresAt));
            },
        }
    }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Callback));
