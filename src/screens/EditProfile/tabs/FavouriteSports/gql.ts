import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { IEditProfileUserInfoVarialbles } from '../UserInfo/gql';

export const EDIT_PROFILE_USER_FAVOURITESPORTS_QUERY = gql`
  query getUserFavouriteSports($id: String!) {
    getUserFavouriteSports: getUser(id: $id) {
      id
      favoriteSports {
        id
        name
      }
    }
  }
`;

interface IEditProfileSport {
  id: number;
}

export interface IEditProfileUserFavouriteSportsResult {
  getUserFavouriteSports: {
    favoriteSports: IEditProfileSport[];
  };
}

export function useEditProfileFavouriteSportsQuery(variables: IEditProfileUserInfoVarialbles) {
  return useQuery<IEditProfileUserFavouriteSportsResult, IEditProfileUserInfoVarialbles>(
    EDIT_PROFILE_USER_FAVOURITESPORTS_QUERY,
    { variables }
  );
}
