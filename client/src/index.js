import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import reducers from './reducers';
import './index.css';
import serviceSaga from './sagas';
import registerServiceWorker from './registerServiceWorker';
import PrivateRoute from './containers/Auth/PrivateRoute';
import Callback from "./containers/Auth/Callback";
import Main from './containers/Main';
import Login from './containers/Login';

import {
  errorLink,
  queryOrMutationLink,
} from './links';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
});

const gqlLinks = [
  authLink,
  errorLink,
  queryOrMutationLink({uri: '/graphql'}),
];

const client = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from(gqlLinks),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

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
        <ApolloProvider client={client}>
          <ConnectedRouter history={history}>
              <Switch>
                <Route path="/callback" exact component={Callback}/>
                <Route path="/login" exact component={Login}/>
                <PrivateRoute path="/" component={Main}/>
              </Switch>
          </ConnectedRouter>
        </ApolloProvider>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
