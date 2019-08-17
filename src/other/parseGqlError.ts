import { ApolloError } from 'apollo-client';

export default function parseGqlError(error: ApolloError) {
  return error.graphQLErrors.map(er => er.message);
}
