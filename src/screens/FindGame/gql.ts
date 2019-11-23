import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { ISearchGameSort } from '.';
import { fullGameInfoFragment } from '../../api/fragments';
import { GameStatus, IGame } from '../../api/games/types';

const fragments = `
  ${fullGameInfoFragment}
`;

export const GET_GAMES_GQL = gql`
  query getGamesWithFilters($filters: GameFiltersInput, $sort: SortInput) {
    games(filters: $filters, sort: $sort) {
      count
      games {
        ...fullGameInfoFragment
      }
    }
  }
  ${fragments}
`;

export interface IGamesListQueryVariables {
  filters: IGamesListQueryFilters;
  sort: ISearchGameSort;
}
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

export default function useGamesListQuery(variables: IGamesListQueryVariables) {
  return useQuery<IGamesListResult, IGamesListQueryVariables>(GET_GAMES_GQL, {
    variables,
    // fetchPolicy: 'no-cache',
  });
}
