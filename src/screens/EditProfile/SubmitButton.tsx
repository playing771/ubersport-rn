import React from 'react';
import SubmitButton from '../../components/SubmitButton';
import handleApoloError from '../../other/handleApoloError';
import { ViewStyle } from 'react-native';
import { IEditProfileVariables } from './gql';

interface IProps<T> {
  variables: IEditProfileVariables;
  gql: object;
  style?: ViewStyle;
  disabled?: boolean;
}

export function EditProfileSubmitButton<T>({ gql, variables, style, disabled }: IProps<T>) {
  return (
    <SubmitButton
      gql={gql}
      variables={variables}
      title="Сохранить"
      onError={handleApoloError}
      style={{ position: 'relative', marginTop: 48, ...style }}
      rounded={true}
      disabled={disabled}
    />
  );
}
