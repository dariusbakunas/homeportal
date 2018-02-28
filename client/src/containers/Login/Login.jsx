import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Logo from './Logo.png';
import * as actions from "../Main/actions";

class Login extends React.PureComponent {
  handleLogin = () => {
    const paramsString = this.props.location.search;
    const params = new URLSearchParams(paramsString);
    const returnUrl = params.get('return');
    this.props.actions.login(returnUrl);
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

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      login: (returnUrl) => {
        dispatch(actions.login.request(returnUrl));
      },
    }
  }
};

export default connect(null, mapDispatchToProps)(Login);
