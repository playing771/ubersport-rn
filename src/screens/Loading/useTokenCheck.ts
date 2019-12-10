import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

const GET_AVALIABLE_SPORTS_QUERY = gql`
  query {
    getAccount {
      id
    }
  }
`;

export function useTokenCheck() {
  return useQuery(GET_AVALIABLE_SPORTS_QUERY);
}
