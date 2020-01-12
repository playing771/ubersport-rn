import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { IEditProfileUserInfoVarialbles } from '../UserInfo/gql';

export const EDIT_PROFILE_USER_FAVOURITESPORTS_QUERY = gql`
  query getUserFavouriteSports {
    getUserFavouriteSports: getAccount {
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

export function useEditProfileFavouriteSportsQuery() {
  return useQuery<IEditProfileUserFavouriteSportsResult>(EDIT_PROFILE_USER_FAVOURITESPORTS_QUERY, {
    fetchPolicy: 'no-cache',
  });
}
