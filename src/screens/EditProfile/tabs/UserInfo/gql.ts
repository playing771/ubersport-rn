import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { IEditProfileUserInfo } from '.';

export const EDIT_PROFILE_USER_INFO_QUERY = gql`
  query getUserInfo($id: String!) {
    getUserInfo: getUser(id: $id) {
      nickname
      firstName
      lastName
      sex
    }
  }
`;

export interface IEditProfileUserInfoVarialbles {
  id: string;
}

export interface IEditProfileUserInfoResult {
  getUserInfo: IEditProfileUserInfo;
}

export function useEditProfileInfoQuery(variables: IEditProfileUserInfoVarialbles) {
  return useQuery<IEditProfileUserInfoResult, IEditProfileUserInfoVarialbles>(
    EDIT_PROFILE_USER_INFO_QUERY,
    { variables }
  );
}
