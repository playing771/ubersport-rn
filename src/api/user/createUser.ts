import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { userInfoFragment } from '../fragments';
import IUser from './types';

const fragments = `
 ${userInfoFragment}
`;

// TODO: add favourite Games
export const CREATE_USER_GQL = gql`
  mutation createUser(
    $email: String
    $password: String
    $nickname: String
    $firstName: String
    $lastName: String
    $middleName: String
    $dateOfBirth: Float
    $favoriteSports: [Float]
  ) {
    createUser(
      userInput: {
        email: $email
        password: $password
        nickname: $nickname
        firstName: $firstName
        lastName: $lastName
        middleName: $middleName
        dateOfBirth: $dateOfBirth
        favoriteSports: $favoriteSports
      }
    ) {
      ...userInfoFragment
    }
  }
  ${fragments}
`;

// type UserInput {
// email: String
// password: String
// nickname: String
// firstName: String
// lastName: String
// middleName: String
// dateOfBirth: Float
//   roles: [String]
//   }

export interface ICreateUserMutationVariables {
  email?: string;
  password?: string;
  nickname?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  dateOfBirth?: number;
  favoriteSports: string[];
}

export interface ICreateUserResult {
  createUser: IUser;
}

export default class CreateUserMutation extends Mutation<
  ICreateUserResult,
  ICreateUserMutationVariables
> {}
