import { call, all, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import Auth from './containers/Auth/Auth';
import * as mainActions from './containers/Main/actions';

const auth = new Auth();

function* login() {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  if (expiresAt && new Date().getTime() < expiresAt) {
    const fullName = localStorage.getItem('full_name');
    const accessToken = localStorage.getItem('access_token');
    const idToken = localStorage.getItem('id_token');

    yield put(mainActions.login.success(
      fullName,
      accessToken,
      idToken,
      expiresAt
    ));
  } else {
    auth.login();
  }
}

function* logout() {
  localStorage.removeItem('full_name');
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  yield put(mainActions.logout.success());
}

function* handleAuth(action) {
  if (/access_token|id_token|error/.test(action.locationHash)) {
    try {
      const authResult = yield call(auth.handleAuthentication);

      const { fullName, accessToken, idToken, expiresAt } = authResult;

      localStorage.setItem('full_name', fullName);
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('id_token', idToken);
      localStorage.setItem('expires_at', expiresAt);

      yield put(mainActions.login.success(
        fullName,
        accessToken,
        idToken,
        expiresAt
      ));
      yield put(push('/'));
    } catch(err) {
      // we call login first and handleAuth second
      yield put(mainActions.login.error(err));
      yield put(mainActions.handleAuth.error(err));
    }
  }
}

export default function* rootSaga() {
  yield all([
    yield takeLatest(mainActions.login.requestType, login),
    yield takeLatest(mainActions.handleAuth.requestType, handleAuth),
    yield takeEvery(mainActions.logout.requestType, logout),
  ]);
}
