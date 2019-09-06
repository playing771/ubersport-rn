import { setContext } from 'apollo-link-context';
import { AsyncStorage } from 'react-native';
import { IUserWithToken } from './api/user/types';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { concat } from 'apollo-link';
import gql from 'graphql-tag';

const authLink = setContext(async (req, { headers }) => {
  const user = await AsyncStorage.getItem('user');
  const token = user ? (JSON.parse(user) as IUserWithToken).token : undefined;

  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

const httpLink = new HttpLink({
  // uri: 'https://ubersport.ru/graphql',
  // uri: 'http://192.168.0.160:3000/graphql',
  uri: 'http://10.1.32.107:3333/graphql',
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authLink, httpLink),
  resolvers: {
    Mutation: {
      // tslint:disable-next-line:variable-name
      toggleTodo: (_root, variables, { cache, getCacheKey }) => {
        console.log('mutate', variables);

        const id = getCacheKey({ __typename: 'TodoItem', id: variables.id });
        const fragment = gql`
          fragment completeTodo on TodoItem {
            completed
          }
        `;
        const todo = cache.readFragment({ fragment, id });
        const data = { ...todo, completed: !todo.completed };
        cache.writeData({ id, data });
        return null;
      },
    },
  },
});
