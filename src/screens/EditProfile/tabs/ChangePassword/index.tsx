import React from 'react';
import UTextInput from '../../../../components/UTextInput';
import { EditProfileFormContainer as FormContainer } from '../../FormContainer';
import { EDIT_PROFILE_MUTATION } from '../../gql';
import { EditProfileSubmitButton as SubmitButton } from '../../SubmitButton';

interface IProps {}

export default function ChangePasswordTab(props: IProps) {
  // TODO: реализовать функционал по смене пароля
  return (
    <FormContainer>
      <UTextInput label="Старый пароль" value={'***'} onChange={() => undefined} />
      <UTextInput label="Новый пароль" value={'***'} onChange={() => undefined} />

      <SubmitButton gql={EDIT_PROFILE_MUTATION} variables={{}} />
    </FormContainer>
  );
}
