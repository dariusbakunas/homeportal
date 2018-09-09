import React from 'react';
import { withRouter } from 'react-router';
import { Loader, Dimmer } from 'semantic-ui-react'
import withAuthContext from '../../HOC/withAuthContext';

export class PrivateWrapper extends React.PureComponent {
  componentDidMount() {
    if (!this.props.authContext.isAuthenticated) {
      this.goToLoginPage(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.authContext.isAuthenticated) {
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
    return this.props.authContext.isAuthenticated ?
      this.props.children :
      <Dimmer active>
        <Loader indeterminate>You must login first...</Loader>
      </Dimmer>
  }
}

export default withAuthContext(withRouter(PrivateWrapper));
