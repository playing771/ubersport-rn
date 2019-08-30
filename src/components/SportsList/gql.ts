import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import ISport from '../../api/sports/Sport.type';

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
  return useQuery<IGetFavouriteSportsResult, IGetFavouriteSportsVariables>(
    GET_FAVOURITE_SPORTS_QUERY,
    { variables }
  );
}
