import gql from 'graphql-tag';
import { ChildDataProps, graphql } from 'react-apollo';
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

interface IVariables {
  id: string;
}

export interface IProfileInfoProps {
  id: string;
}

export interface IGetUserResult {
  getUser: IUser;
}

interface IInputProps extends IVariables, IProfileInfoProps {}

// export class SportsQuery extends Query<IGetUserResult, IVariables> {}

export type WithProfileInfoProps = ChildDataProps<
  IInputProps,
  IGetUserResult,
  IVariables
>;

const withUserInfoQuery = graphql<
  IInputProps,
  Response,
  IVariables,
  WithProfileInfoProps
>(GET_USER_INFO_GQL, {
  options: ({ id }) => ({
    variables: { id }
  })
});

export type WithEditProfileInfoProps = ChildDataProps<
  IInputProps,
  IGetUserResult,
  IVariables
>;

interface IEditInputProps extends IVariables {
  id: string;
}

// аналогичен hoc-компоненту выше, но без navigation
export const withEditUserInfoQuery = graphql<
  IEditInputProps,
  Response,
  IVariables,
  WithEditProfileInfoProps
>(GET_USER_INFO_GQL, {
  options: ({ id }) => ({
    variables: { id }
  })
});

export default withUserInfoQuery;
