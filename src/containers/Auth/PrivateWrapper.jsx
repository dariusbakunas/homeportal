import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as actions from "../Main/actions";

export class PrivateWrapper extends React.PureComponent {
  constructor(props) {
    super(props);

    if (!this.props.isAuthenticated) {
      this.props.actions.login();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.props.actions.login();
    }
  }

  render() {
    return this.props.isAuthenticated ? this.props.children : 'You must login first';
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
      login: () => {
        dispatch(actions.login.request());
      },
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateWrapper);
