import React, { ReactElement } from 'react';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

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
    favouriteSportIds?: string[];
  };
}

export const EDIT_USER_MUTATION = gql`
  mutation($id: ID!, $userInput: UserInput) {
    editUser(id: $id, userInput: $userInput) {
      id
    }
  }
`;

export default function EditUserMutation({
  children,
  variables
}: {
  children: any;
  variables: IEditProfileVariables;
}) {
  return (
    <Mutation mutation={EDIT_USER_MUTATION} variables={variables}>
      {children}
    </Mutation>
  );
}
