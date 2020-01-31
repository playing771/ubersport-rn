import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { AsyncStorage } from 'react-native';
import { IUserWithToken } from './api/user/types';
import { BASE_URL, WS_URL } from './constants/Api';
import { resolvers, typeDefs } from './store/resolvers';

const cache = new InMemoryCache();

const authLink = setContext(async (req, { headers }) => {
  const user = await AsyncStorage.getItem('user');

  const token = user ? (JSON.parse(user) as IUserWithToken).token : undefined;
  if (user) {
    // console.log('nickname', JSON.parse(user).nickname);
    // console.log('id', JSON.parse(user).id);
  }
  // console.log('token', token);

  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

const httpLink = new HttpLink({
  uri: `${BASE_URL}/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `${WS_URL}/graphql`,
  options: {
    reconnect: true,
  },
});
//
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  cache,
  link,
  resolvers,
  typeDefs,
});

const data = {
  myLocation: {
    address: null,
    __typename: 'MyLocation',
  },
  networkStatus: {
    __typename: 'NetworkStatus',
    isConnected: false,
  },
};

cache.writeData({ data });
