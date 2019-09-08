import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { fullGameInfoFragment } from '../../api/fragments';
import { IGame } from '../../api/games/types';

// TODO: добавить Participant count в схему

const fragments = `
  ${fullGameInfoFragment}
`;

export const GET_GAME_INFO_GQL = gql`
  query getGameInfo($id: ID!) {
    game(id: $id) {
      ...fullGameInfoFragment
    }
  }
  ${fragments}
`;

interface IGameInfoQueryVariables {
  id: string;
}
interface IGameInfoQueryResponse {
  game: IGame;
}

export default function useGameInfoQuery(variables: IGameInfoQueryVariables) {
  return useQuery<IGameInfoQueryResponse, IGameInfoQueryVariables>(GET_GAME_INFO_GQL, {
    variables,
  });
}
