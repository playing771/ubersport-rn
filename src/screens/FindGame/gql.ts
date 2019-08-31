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
    $authorId: String
    $status: GameStatus
    $participantsIds: [String!]
    $sort: SortInput
  ) {
    games(
      filters: {
        sportIds: $sportIds
        authorId: $authorId
        status: $status
        participantsIds: $participantsIds
      }
      sort: $sort
    ) {
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
export interface IGamesListQueryVariables {
  filters: IGamesListQueryFilters;
  sort: ISearchGameSort;
}
export interface IGamesListResult {
  games: {
    count: number;
    games: IGame[];
    __typename?: string;
  };
}

export default function useGamesList(variables: IGamesListQueryVariables) {
  return useQuery<IGamesListResult, IGamesListQueryVariables>(GET_GAMES_GQL, {
    variables,
    fetchPolicy: 'no-cache',
  });
}
