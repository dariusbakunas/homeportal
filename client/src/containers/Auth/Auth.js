import auth0 from 'auth0-js';

export default class Auth {
  constructor() {
    const env = this.getEnv();

    this.auth0 = new auth0.WebAuth({
      domain: env.REACT_APP_AUTH_DOMAIN,
      clientID: env.REACT_APP_AUTH_CLIENT_ID,
      redirectUri: env.REACT_APP_AUTH_REDIRECT_URI,
      audience: env.REACT_APP_AUTH_AUDIENCE,
      responseType: env.REACT_APP_AUTH_RESPONSE_TYPE,
      scope: env.REACT_APP_AUTH_SCOPE,
    });
  }

  getEnv = () => {
    return window.env ? window.env : process.env;
  };

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        console.log(authResult)
        if (authResult && authResult.accessToken && authResult.idToken) {
          resolve(authResult);
        } else if (err) {
          reject(err);
        }
      });
    });
  };

  renewToken = () => {
    return new Promise(((resolve, reject) => {
      this.auth0.checkSession({}, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }));
  };

  scheduleRenewal = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const delay = expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken();
      }, delay);
    }
  };

  login = () => {
    this.auth0.authorize();
  };
}
