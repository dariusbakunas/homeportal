import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router';
import { Loader, Dimmer } from 'semantic-ui-react'

export class PrivateWrapper extends React.PureComponent {
  constructor(props) {
    super(props);

    if (!props.isAuthenticated) {
      this.goToLoginPage(props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.goToLoginPage(nextProps);
    }
  }

  goToLoginPage = (props) => {
    const returnUrl = props.location ? props.location.pathname : '/';

    props.history.push({
      pathname: '/login',
      search: `?return=${returnUrl}`
    })
  };

  render() {
    return this.props.isAuthenticated ?
      this.props.children :
      <Dimmer active>
        <Loader indeterminate>You must login first...</Loader>
      </Dimmer>
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default withRouter(connect(mapStateToProps, null)(PrivateWrapper));
