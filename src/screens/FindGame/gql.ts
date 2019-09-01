import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { fullGameInfoFragment } from '../../api/fragments';
import { GameStatus, IGame } from '../../api/games/types';
import { ISearchGameSort } from '.';

const fragments = `
  ${fullGameInfoFragment}
`;

export const GET_GAMES_GQL = gql`
  query getGamesWithFilters(
    $sportIds: [Float]
    # $authorId: String
    $status: GameStatus # $participantsIds: [String!]
  ) {
    games(filters: { sportIds: $sportIds, status: $status }) {
      count
      games {
        ...fullGameInfoFragment
      }
    }
  }
  ${fragments}
`;

export interface IGamesListQueryFilters {
  sportIds?: number[];
  authorId?: string;
  status?: GameStatus;
  participantsIds?: string[];
}

export interface IGamesListResult {
  games: {
    count: number;
    games: IGame[];
    __typename?: string;
  };
}

export default function useGamesListQuery(variables: IGamesListQueryFilters) {
  return useQuery<IGamesListResult, IGamesListQueryFilters>(GET_GAMES_GQL, {
    variables,
    fetchPolicy: 'no-cache',
  });
}
