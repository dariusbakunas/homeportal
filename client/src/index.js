import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';
import './index.css';
import serviceSaga from './sagas';
import registerServiceWorker from './registerServiceWorker';
import PrivateRoute from './containers/Auth/PrivateRoute';
import Callback from "./containers/Auth/Callback";
import Main from './containers/Main';

const history = createHistory();

const composeEnhancers =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
    // other store enhancers if any
);

let store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    enhancer,
);

sagaMiddleware.run(serviceSaga);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
              <Route path="/callback" exact component={Callback}/>
              <PrivateRoute path="/" component={Main}/>
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
