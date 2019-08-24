import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
// import { IProfileInfoProps } from '../../screens/Profile/Info';
import IUser from './types';
import { NavigationScreenProps } from 'react-navigation';

export const GET_USER_INFO_GQL = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      id
      nickname
      email
      firstName
      lastName
      middleName
      dateOfBirth
      sex
      favoriteSports {
        name
        id
      }
    }
  }
`;

export interface IGetUserInfoVariables {
  id: string;
}

export interface IProfileInfoProps {
  id: string;
}

export interface IGetUserInfoResult {
  getUser: IUser;
}
