import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router';
import { Loader, Dimmer } from 'semantic-ui-react'
import * as actions from "../Main/actions";

export class PrivateWrapper extends React.PureComponent {
  constructor(props) {
    super(props);

    if (!this.props.isAuthenticated) {
      this.props.actions.login(this.props.location.pathname);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.props.actions.login(this.props.location.pathname);
    }
  }

  render() {
    return this.props.isAuthenticated ?
      this.props.children :
      <Dimmer active>
        <Loader indeterminate>Authenticating...</Loader>
      </Dimmer>
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      login: (returnUrl) => {
        dispatch(actions.login.request(returnUrl));
      },
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateWrapper));
