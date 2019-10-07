import gql from 'graphql-tag';
// import { IProfileInfoProps } from '../../screens/Profile/Info';
import { ISex } from './types';

export const GET_USER_INFO_GQL = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      nickname
      email
      firstName
      lastName
      middleName
      dateOfBirth
      sex
      avatar
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
  getUser: {
    nickname: string;
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    dateOfBirth: number;
    sex: ISex;
    avatar: string;
  };
}
