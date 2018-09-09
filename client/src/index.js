import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import './index.css';
import { AuthProvider } from "./containers/Auth/AuthProvider";
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

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/callback" exact component={Callback}/>
          <Route path="/login" exact component={Login}/>
          <PrivateRoute path="/" component={Main}/>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById('root'));

//registerServiceWorker();
