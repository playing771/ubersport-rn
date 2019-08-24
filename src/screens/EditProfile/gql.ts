import gql from 'graphql-tag';
import { ISex } from '../../api/user/types';
import { useMutation } from 'react-apollo';

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
  };
}

export interface IEditProfileReponse {
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
  return useMutation<IEditProfileReponse, IEditProfileVariables>(EDIT_PROFILE_MUTATION);
}
