import { ApolloError } from 'apollo-client';
import React from 'react';
import { ViewStyle } from 'react-native';
import SubmitButton from '../../components/buttons/SubmitButton';
import withErrorCard from '../../components/hocs/WithErrorCard';
import { IEditProfileVariables } from './gql';

interface IProps {
  variables: IEditProfileVariables;
  gql: object;
  style?: ViewStyle;
  disabled?: boolean;
  onError?: (err: ApolloError) => void;
}

function EditProfileSubmitButton({ gql, variables, style, disabled, onError }: IProps) {
  return (
    <SubmitButton
      gql={gql}
      variables={variables}
      title="Сохранить"
      onError={onError}
      style={{ position: 'relative', marginTop: 48, ...style }}
      rounded={true}
      disabled={disabled}
    />
  );
}

export default withErrorCard(EditProfileSubmitButton);
