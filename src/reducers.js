import { combineReducers } from 'redux'

function authReducer(state = { isLoggedIn: false }, action) {
    return state;
}

const reducers = {
    auth: authReducer,
};

export default reducers;