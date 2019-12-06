import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { fullGameInfoFragment } from '../../api/fragments';
import { GameStatus, IGame } from '../../api/games/types';
import { Sort } from '../../utils/types';

const fragments = `
  ${fullGameInfoFragment}
`;

export const GET_GAMES_GQL = gql`
  query getGamesWithFilters($filters: GameFiltersInput, $sort: SortStructInput, $page: PageInput) {
    games(filters: $filters, sort: $sort, page: $page) {
      count
      games {
        ...fullGameInfoFragment
      }
    }
  }
  ${fragments}
`;

interface IPagination {
  pageNumber: number;
  pageSize: number;
}

export interface IGamesListQueryVariables {
  filters?: IGamesListQueryFilters;
  sort?: Sort;
  page?: IPagination;
}

export interface ILocationFilter {
  latitude: number;
  longitude: number;
  coordinates?: number[];
  radius?: number;
}
export interface IGamesListQueryFilters {
  sportIds?: number[];
  authorId?: string;
  status?: GameStatus;
  participantsIds?: string[];
  location?: ILocationFilter;
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
