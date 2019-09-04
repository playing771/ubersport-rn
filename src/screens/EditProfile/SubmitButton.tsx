import React from 'react';

import handleApoloError from '../../utils/handleApoloError';
import { ViewStyle } from 'react-native';
import { IEditProfileVariables } from './gql';
import SubmitButton from '../../components/Buttons/SubmitButton';

interface IProps {
  variables: IEditProfileVariables;
  gql: object;
  style?: ViewStyle;
  disabled?: boolean;
}

export function EditProfileSubmitButton({ gql, variables, style, disabled }: IProps) {
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
