## Homeportal - React, Express app for my home APIs

[![Build Status](https://travis-ci.org/dariusbakunas/homeportal.svg?branch=master)](https://travis-ci.org/dariusbakunas/homeportal)

### API projects:

* [pyvirt-api](https://github.com/dariusbakunas/pyvirt-api) - for interacting with Xen host


### Local dev:

* Install dependencies:

    ```% npm install && cd client && npm install```

* Create .env file at project root, set values for Auth0 config:

    ```
    REACT_APP_AUTH_DOMAIN=
    REACT_APP_AUTH_CLIENT_ID=
    REACT_APP_AUTH_REDIRECT_URI=http://localhost:3000/callback
    REACT_APP_AUTH_AUDIENCE=
    REACT_APP_AUTH_RESPONSE_TYPE=
    REACT_APP_AUTH_SCOPE=
    PYVIRT_API_HOSTNAME=
    ```

* Start node and webpack dev server:

    ```% npm run dev```

* Go to [http://localhost:3000/](http://localhost:3000/) to access the app
