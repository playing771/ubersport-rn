import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import { ILocation } from '../../../api/games/types';

export interface IEditProfileVariables {
  id: string;
  userInput: {
    location: ILocation;
  };
}

export interface IEditProfileReponse {
  location: ILocation;
}

export const EDIT_PROFILE_MUTATION = gql`
  mutation($id: ID!, $userInput: UserInput) {
    editUser(id: $id, userInput: $userInput) {
      location {
        address
        coordinates
      }
    }
  }
`;

export function useUserLocationEdit() {
  return useMutation<IEditProfileReponse, IEditProfileVariables>(EDIT_PROFILE_MUTATION);
}
