import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { IGetParticipantsResult } from '../../api/games/types';

interface IGetParticipantsVariables {
  id: string;
}

export const GET_PARTICIPANTS_GQL = gql`
  query GetParticipants($id: ID!) {
    game(id: $id) {
      participants {
        id
        firstName
        lastName
        nickname
        dateOfBirth
        avatar
      }
      author {
        id
        firstName
        lastName
        nickname
        dateOfBirth
        avatar
      }
    }
  }
`;

export function useGetParticipantsQuery(variables: IGetParticipantsVariables) {
  return useQuery<IGetParticipantsResult, IGetParticipantsVariables>(GET_PARTICIPANTS_GQL, {
    variables,
  });
}
