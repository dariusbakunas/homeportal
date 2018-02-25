import auth0 from 'auth0-js';

export default class Auth {
    constructor() {
      console.log(window.env);

      this.auth0 = new auth0.WebAuth({
        domain: this.getEnvVariable('REACT_APP_AUTH_DOMAIN'),
        clientID: this.getEnvVariable('REACT_APP_AUTH_CLIENT_ID'),
        redirectUri: this.getEnvVariable('REACT_APP_AUTH_REDIRECT_URI'),
        audience: this.getEnvVariable('REACT_APP_AUTH_AUDIENCE'),
        responseType: this.getEnvVariable('REACT_APP_AUTH_RESPONSE_TYPE'),
        scope: this.getEnvVariable('REACT_APP_AUTH_SCOPE'),
      });
    }

    getEnvVariable = (variable) => {
      const env = window.env ? window.env : process.env;
      return env[variable];
    };

    handleAuthentication = () => {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    resolve({
                        fullName: authResult.idTokenPayload.name,
                        accessToken: authResult.accessToken,
                        idToken: authResult.idToken,
                        expiresAt: JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
                    });
                } else if (err) {
                    reject(err);
                }
            });
        });
    };

    login = () => {
        this.auth0.authorize();
    };
}
