import { ApolloError } from 'apollo-client';
import React, { useCallback, useState } from 'react';
import UTextInput from '../../../../components/UTextInput';
import useAppContext from '../../../../hooks/useAppContext';
import useForm from '../../../../hooks/UseForm';
import SubmitButton from '../../controls/SubmitButton';
import { EditProfileFormContainer as FormContainer } from '../../FormContainer';
import { EDIT_PROFILE_MUTATION, IEditProfileVariables } from '../../gql';

export default function ChangePasswordTab() {
  const { user } = useAppContext();
  const { values, useTextInput, isValid } = useForm();
  const [error, setError] = useState<ApolloError>();
  const handleError = useCallback((err: ApolloError) => setError(err), []);

  const newInput: IEditProfileVariables = {
    id: user.id,
    userInput: { password: values.newPassword },
  };

  const valid = isValid && values.newPassword === values.repeat;

  return (
    <FormContainer>
      <UTextInput
        secureTextEntry={true}
        label="Новый пароль"
        placeholder="Минимум 6 символов"
        {...useTextInput('newPassword', { isRequired: 'true', isLength: { min: 6 } })}
      />
      <UTextInput
        label="Подтвердите пароль"
        secureTextEntry={true}
        {...useTextInput('repeat', 'isRequired')}
      />
      <SubmitButton
        gql={EDIT_PROFILE_MUTATION}
        variables={newInput}
        onError={handleError}
        error={error}
        disabled={!valid}
      />
    </FormContainer>
  );
}
