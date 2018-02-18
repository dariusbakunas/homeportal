import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';
import './index.css';
import Main from './containers/Main';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(routerMiddleware(history), createSagaMiddleware()),
    // other store enhancers if any
);

let store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    enhancer,
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Main/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
