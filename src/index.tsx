import React from 'react';
import gql from 'graphql-tag';
import ReactDOM from 'react-dom';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';
import {ApolloProvider, Query} from 'react-apollo';
// import resolvers from './resolvers';
// import typeDefs from './typeDefs';
import Login from './views/Login';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();

const link = ApolloLink.from([
  onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
      graphQLErrors.map(({message, locations, path}) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  new HttpLink({
    uri: 'http://localhost:4000',
    credentials: 'same-origin',
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('flavorli-token'),
    },
  }),
]);

const client = new ApolloClient({
  link,
  cache,
  // typeDefs,
  // resolvers,
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('flavorli-admin-token'),
  },
});

const IS_LOGGED_IN = gql`
  query IsAdminLoggedIn {
    isLoggedIn @client
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN}>
      {({data}: any) => (data.isLoggedIn ? <App /> : <Login />)}
    </Query>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
