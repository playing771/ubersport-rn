import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { concat } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { AsyncStorage } from 'react-native';
import { IUserWithToken } from './api/user/types';
import { resolvers, typeDefs } from './store/resolvers';

const cache = new InMemoryCache();

const authLink = setContext(async (req, { headers }) => {
  const user = await AsyncStorage.getItem('user');
  const token = user ? (JSON.parse(user) as IUserWithToken).token : undefined;
  if (user) {
    console.log('nickname', JSON.parse(user).nickname);
    console.log('id', JSON.parse(user).id);
  }
  console.log('token', token);

  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

const httpLink = new HttpLink({
  uri: 'https://ubersport.ru/graphql',
  // uri: 'http://192.168.0.160:3000/graphql',
  // uri: 'http://10.1.32.107:3333/graphql',
});

export const client = new ApolloClient({
  cache,
  link: concat(authLink, httpLink),
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
