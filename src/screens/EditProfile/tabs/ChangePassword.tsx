import React from 'react';
import { EditProfileFormContainer as FormContainer } from '../FormContainer';
import UTextInput from '../../../components/UTextInput';

interface IProps {}

export default function ChangePasswordTab(props: IProps) {
  return (
    <FormContainer>
      <UTextInput label="Старый пароль" value={'***'} onChange={() => undefined} />
      <UTextInput label="Новый пароль" value={'***'} onChange={() => undefined} />
    </FormContainer>
  );
}
