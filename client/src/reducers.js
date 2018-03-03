import * as mainActions from './containers/Main/actions';
import * as vmActions from './containers/VMS/actions';

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

function vmsReducer(state = {}, action) {
  if (action.type === vmActions.apiGetDomainList.successType) {
    return {
      ...state,
      domains: { ...action.domains }
    };
  }

  return state;
}

const reducers = {
    auth: authReducer,
    vms: vmsReducer,
};

export default reducers;
