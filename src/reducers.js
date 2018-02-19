import * as mainActions from './containers/Main/actions';

function authReducer(state = { isAuthenticated: false }, action) {
    if (action.type === mainActions.login.successType) {
        return {
            isAuthenticated: true,
            fullName: action.fullName,
            accessToken: action.accessToken,
            idToken: action.idToken,
            expiresAt: action.expiresAt,
        };
    } else if (action.type === mainActions.logout.successType) {
      return {
        isAuthenticated: false,
      };
    }
    return state;
}

const reducers = {
    auth: authReducer,
};

export default reducers;
