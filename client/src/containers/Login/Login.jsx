import React from 'react';
import { Button } from 'semantic-ui-react';
import Logo from './Logo.png';
import { withRouter } from 'react-router-dom'
import withAuthContext from '../../HOC/withAuthContext';

class Login extends React.PureComponent {
  componentDidMount() {
    if (this.props.authContext.isAuthenticated) {
      const returnUrl = this.getQueryParam('return');
      this.props.history.push(returnUrl);
    }
  }

  getQueryParam = (param) => {
    const params = new URLSearchParams(this.props.location.search);
    return params.get(param);
  };

  handleLogin = () => {
    const returnUrl = this.getQueryParam('return');

    if (this.props.authContext.isAuthenticated) {
      this.props.history.push(returnUrl);
    }

    localStorage.setItem('return_url', returnUrl);
    this.props.authContext.login();
  };

  render() {
    return (
      <div style={styles.loginFormContainer}>
        <img src={Logo}/>
        <Button
          style={styles.loginButton}
          onClick={this.handleLogin}
          size='small'>
          LOGIN
        </Button>
      </div>
    );
  };
}

const styles = {
  loginFormContainer: {
    flexDirection: 'column',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    marginTop: 20,
    letterSpacing: 2,
  }
};

export default withAuthContext(withRouter(Login));
