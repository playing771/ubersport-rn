import React from 'react';
import SubmitButton from '../../components/SubmitButton';
import { EDIT_USER_MUTATION } from './gql';
import handleApoloError from '../../other/handleApoloError';
import { ViewStyle } from 'react-native';

interface IProps<T> {
  variables: T;
  gql: any;
  style?: ViewStyle;
}

// EDIT_USER_MUTATION

export function EditProfileSubmitButton<T>({ gql, variables, style }: IProps<T>) {
  return (
    <SubmitButton
      gql={gql}
      variables={variables}
      title="Сохранить"
      onError={handleApoloError}
      style={{ position: 'relative', marginTop: 48, ...style }}
      rounded={true}
    />
  );
}
