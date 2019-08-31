import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { fullGameInfoFragment } from '../../api/fragments';
import { GameStatus, IGame } from '../../api/games/types';

const fragments = `
  ${fullGameInfoFragment}
`;

export const GET_GAMES_GQL = gql`
  query getGamesWithFilters(
    $sportIds: [Float]
    $authorId: String
    $status: GameStatus
    $participantsIds: [String!]
  ) {
    games(
      filters: {
        sportIds: $sportIds
        authorId: $authorId
        status: $status
        participantsIds: $participantsIds
      }
    ) {
      count
      games {
        ...fullGameInfoFragment
      }
    }
  }
  ${fragments}
`;

export type IGamesListQueryVariables = {
  sportIds?: number[];
  authorId?: string;
  status?: GameStatus;
  participantsIds?: string[];
};

export interface IGamesListResult {
  games: {
    count: number;
    games: IGame[];
    __typename?: string;
  };
}

export default function useGamesList(variables: IGamesListQueryVariables) {
  return useQuery<IGamesListResult, IGamesListQueryVariables>(GET_GAMES_GQL, { variables });
}
