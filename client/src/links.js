import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  /*
  onError receives a callback in the event a GraphQL or network error occurs.
  This example is a bit contrived, but in the real world, you could connect
  a logging service to the errorLink or perform a specific action in response
  to an error.
  */
  if (graphQLErrors)
    graphQLErrors.map(({ message, location, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const queryOrMutationLink = (config = {}) =>
  createHttpLink({
    ...config,
    credentials: 'same-origin',
  });

// export const subscriptionLink = (config = {}) =>
//   new WebSocketLink({
//     uri:
//       process.env.NODE_ENV !== 'production'
//         ? 'ws://localhost:3010/subscriptions'
//         : 'ws://api.githunt.com/subscriptions',
//     options: { reconnect: true },
//     ...config,
//   });
