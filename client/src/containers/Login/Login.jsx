import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Logo from './Logo.png';
import * as actions from "../Main/actions";
import { getAuthInfo } from "../../utils/localStorage";

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    const authInfo = getAuthInfo();

    if (authInfo) {
      const {fullName, accessToken, idToken, expiresAt} = authInfo;

      this.props.actions.loginSuccess(
        fullName,
        accessToken,
        idToken,
        expiresAt,
        this.getQueryParam(props, 'return'),
      );
    }
  }

  getQueryParam = (props, param) => {
    const params = new URLSearchParams(props.location.search);
    return params.get(param);
  };

  handleLogin = () => {
    this.props.actions.login(
      this.getQueryParam(this.props, 'return')
    );
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
      loginSuccess: (fullName, accessToken, idToken, expiresAt, returnUrl) => {
        dispatch(actions.login.success(fullName, accessToken, idToken, expiresAt, returnUrl));
      },
    }
  }
};

export default connect(null, mapDispatchToProps)(Login);
