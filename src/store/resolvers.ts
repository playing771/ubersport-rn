export const typeDefs = `
    type Query {
      address: String
    }
  `;

export const resolvers = {
  Mutation: {
    // tslint:disable-next-line:variable-name
    setLocation: (_root, variables, { cache, getCacheKey }) => {
      console.log('mutate', variables);
      // console.log('_root', _root);
      // console.log('cache', cache);
      const address = getCacheKey({ __typename: 'Address', address: variables.address });
      // const fragment = gql`
      //   fragment locationAdress on Location {
      //     completed
      //   }
      // `;
      console.log('address', address);

      cache.writeData({ address: variables.address });
      return null;
    },
  },
  Query: {
    address: () => ({ __typename: 'Address', address: '1' }),
  },
};
