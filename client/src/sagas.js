import { call, all, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import Auth from './containers/Auth/Auth';
import { getAuthInfo } from './utils/localStorage';
import * as mainActions from './containers/Main/actions';
import * as vmActions from './containers/VMS/actions';
import * as vmApi from './services/pyvirtApi';

const auth = new Auth();

function* login(action) {
  const authInfo = getAuthInfo();

  if (authInfo) {
    const {fullName, accessToken, idToken, expiresAt} = authInfo;

    yield put(mainActions.login.success(
      fullName,
      accessToken,
      idToken,
      expiresAt,
      action.returnUrl,
    ));
  } else {
    localStorage.setItem('return_url', action.returnUrl);
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

function* loginSuccess(action) {
  const returnUrl = action.returnUrl ? action.returnUrl : '/';
  yield put(push(returnUrl));
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

      const returnUrl = localStorage.getItem('return_url');

      yield put(mainActions.login.success(
        fullName,
        accessToken,
        idToken,
        expiresAt,
        returnUrl ? returnUrl : '/',
      ));
    } catch(err) {
      // we call login first and handleAuth second
      yield put(mainActions.login.error(err));
      yield put(mainActions.handleAuth.error(err));
    }
  }
}

function *getDomainList(action) {
  try {
    const domains = yield call(vmApi.getDomainList, action.accessToken);
    yield put(vmActions.apiGetDomainList.success(domains));
  } catch(err) {
    yield put(vmActions.apiGetDomainList.error(err));
  }
}

export default function* rootSaga() {
  yield all([
    yield takeLatest(mainActions.login.requestType, login),
    yield takeLatest(mainActions.handleAuth.requestType, handleAuth),
    yield takeLatest(vmActions.apiGetDomainList.requestType, getDomainList),

    yield takeEvery(mainActions.logout.requestType, logout),
    yield takeEvery(mainActions.login.successType, loginSuccess),
  ]);
}
