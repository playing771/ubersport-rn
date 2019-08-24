import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import ISport from '../../../../api/sports/Sport.type';
import { IEditProfileUserInfoVarialbles } from '../UserInfo/gql';

export const EDIT_PROFILE_USER_FAVOURITESPORTS_QUERY = gql`
  query getUserFavouriteSports($id: String!) {
    getUserFavouriteSports: getUser(id: $id) {
      favoriteSports {
        id
      }
    }
  }
`;

export interface IEditProfileUserFavouriteSportsResult {
  getUserFavouriteSports: {
    favouriteSports: number[];
  };
}

export function useEditProfileFavouriteSportsQuery(variables: IEditProfileUserInfoVarialbles) {
  return useQuery<IEditProfileUserFavouriteSportsResult, IEditProfileUserInfoVarialbles>(
    EDIT_PROFILE_USER_FAVOURITESPORTS_QUERY,
    { variables }
  );
}
