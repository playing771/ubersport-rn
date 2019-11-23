import { ApolloError } from 'apollo-client';
import React, { useCallback, useState } from 'react';
import UTextInput from '../../../../components/UTextInput';
import useAppContext from '../../../../hooks/useAppContext';
import useForm from '../../../../hooks/UseForm';
import { EditProfileFormContainer as FormContainer } from '../../FormContainer';
import { EDIT_PROFILE_MUTATION, IEditProfileVariables } from '../../gql';
import SubmitButton from '../../SubmitButton';

export default function ChangePasswordTab() {
  const { user } = useAppContext();
  const { values, useTextInput, isValid } = useForm();
  const [error, setError] = useState<ApolloError>();
  const handleError = useCallback((err: ApolloError) => setError(err), []);

  const newInput: IEditProfileVariables = {
    id: user.id,
    userInput: { password: values.newPassword },
  };
  return (
    <FormContainer>
      {/* <UTextInput label="Старый пароль" {...useTextInput('old', 'isRequired')} /> */}
      <UTextInput
        secureTextEntry={true}
        label="Новый пароль"
        {...useTextInput('newPassword', 'isRequired')}
      />
      <SubmitButton
        gql={EDIT_PROFILE_MUTATION}
        variables={newInput}
        onError={handleError}
        error={error}
        disabled={!isValid}
      />
    </FormContainer>
  );
}
