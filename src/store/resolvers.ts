export const typeDefs = `
    type Query {
      myLocation: {
        address: String!,
        coordinates: [Float!]
      }
    }
    type Mutation {
      myLocation(location: locationInput): myLocation
    }
    input locationInput {
      address: String!,
      coordinates: [Float!]
    }
  `;

export const resolvers = {
  Mutation: {
    myLocation: async (_root, { location }, { cache, getCacheKey }) => {
      console.log('mutate variables', location);

      await cache.writeData({ data: { myLocation: location } });
      return null;
    },
  },
  Query: {
    // myLocation: async () => ({ __typename: 'Address', address: '1' }),
  },
};
