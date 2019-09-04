import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import ISport from '../../api/sports/Sport.type';
import useAuthCheck from '../../hooks/useAuthCheck';

export const GET_FAVOURITE_SPORTS_QUERY = gql`
  query getFavouriteSports($id: String!) {
    getFavouriteSports: getUser(id: $id) {
      favoriteSports {
        name
        id
      }
    }
  }
`;

export interface IGetFavouriteSportsResult {
  getFavouriteSports: {
    favoriteSports: ISport[];
  };
}

interface IGetFavouriteSportsVariables {
  id: string;
}

export default function useFavouriteSportsQuery(variables: IGetFavouriteSportsVariables) {
  const { authCheck } = useAuthCheck();
  // если non authorized, возвращаем объект с пустым результатом
  return authCheck()
    ? useQuery<IGetFavouriteSportsResult, IGetFavouriteSportsVariables>(
        GET_FAVOURITE_SPORTS_QUERY,
        { variables }
      )
    : { data: { getFavouriteSports: { favoriteSports: [] } }, loading: false, error: undefined };
}
