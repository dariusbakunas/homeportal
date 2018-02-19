import auth0 from 'auth0-js';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: process.env.REACT_APP_AUTH_DOMAIN,
        clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
        redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI,
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
        responseType: process.env.REACT_APP_AUTH_RESPONSE_TYPE,
        scope: process.env.REACT_APP_AUTH_SCOPE,
    });

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
