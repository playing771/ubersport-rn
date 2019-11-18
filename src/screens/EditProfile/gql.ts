import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import { ISex } from '../../api/user/types';

export interface IEditProfileVariables {
  id: string;
  userInput: {
    email?: string;
    password?: string;
    nickname?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    dateOfBirth?: number;
    favoriteSports?: number[];
    sex?: ISex;
    avatar?: string;
    location?: Location;
  };
}

export interface IEditProfileResponse {
  id: string;
}

export const EDIT_PROFILE_MUTATION = gql`
  mutation($id: ID!, $userInput: UserInput) {
    editUser(id: $id, userInput: $userInput) {
      id
    }
  }
`;

export function useEditUserProfileMutation() {
  return useMutation<IEditProfileResponse, IEditProfileVariables>(EDIT_PROFILE_MUTATION);
}
