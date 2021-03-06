import React from 'react';
import Auth from "./Auth";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.auth = new Auth();

    this.state = {
      isAuthenticated: false,
    };
  }

  renewToken= () => {
    try {
      const { idTokenPayload, accessToken, idToken, expiresIn } = this.auth.renewToken();
      const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());


    } catch (err) {

    }
  };

  handleAuth = (locationHash) => {
    return new Promise((resolve, reject) => {
      if (/access_token|id_token|error/.test(locationHash)) {
        this.auth.handleAuthentication()
          .then(({ idTokenPayload, accessToken, idToken, expiresIn }) => {
            const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());

            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('id_token', idToken);
            localStorage.setItem('expires_at', expiresAt);

            this.setState(() => {
              return {
                isAuthenticated: true,
              }
            }, () => {
              resolve({ idTokenPayload, accessToken, idToken, expiresAt });
            });
          })
          .catch((err) => {
            this.setState(() => {
              return {
                isAuthenticated: false,
              }
            }, () => {
              reject(err);
            });
          });
      } else {
        reject(new Error('Auth: Invalid location hash'));
      }
    });
  };

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.setState({
      isAuthenticated: false,
    });
  };

  componentDidMount() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));

    const isAuthenticated = expiresAt && new Date().getTime() < expiresAt;

    this.setState({
      isAuthenticated
    });
  }

  render() {
    return (
      <AuthContext.Provider value={{
        login: this.auth.login,
        handleAuth: this.handleAuth,
        logout: this.logout,
        isAuthenticated: this.state.isAuthenticated
      }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export { AuthProvider, AuthContext }
