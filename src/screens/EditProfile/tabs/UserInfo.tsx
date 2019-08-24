import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useQuery } from 'react-apollo';
import {
  GET_USER_INFO_GQL,
  IGetUserInfoResult,
  IGetUserInfoVariables,
} from '../../../api/user/withUserInfoQuery';

import ULoader from '../../../components/ULoader/index';
import UTextInput from '../../../components/UTextInput/index';
import SportsList from '../../../components/SportsList';
import EditGender from '../../../components/Buttons/Switch';
import SubmitButton from '../../../components/SubmitButton';
import { EDIT_USER_MUTATION, IEditProfileVariables } from '../gql';

import handleApoloError from '../../../other/handleApoloError';
import AvatarSelect from '../AvatarSelect';

import { EditProfileFormContainer as FormContainer } from '../FormContainer';

interface IProps {
  id: string;
}

export default function UserInfoTab({ id }: IProps) {
  // const { loading, error, getUser } = data;

  const { data, loading, error } = useQuery<IGetUserInfoResult, IGetUserInfoVariables>(
    GET_USER_INFO_GQL,
    { variables: { id } }
  );

  if (error) {
    console.log('ERROR', handleApoloError(error));
    return <Text>ERROR</Text>;
  }

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickname, setNickname] = useState('');

  const { getUser } = data;

  useEffect(() => {
    if (getUser) {
      setFirstName(getUser.firstName);
      setLastName(getUser.lastName);
      setNickname(getUser.nickname);
    }
  }, [getUser]);

  const changeFirstNameHandle = (text: string) => {
    setFirstName(text);
  };

  const changeLastNameHandle = (text: string) => {
    setLastName(text);
  };

  const changeNicknameHandle = (text: string) => {
    setNickname(text);
  };

  if (loading || !getUser) {
    return <ULoader />;
  }

  const updateVariables: IEditProfileVariables = {
    id: getUser.id,
    userInput: {
      firstName,
      lastName,
      nickname,
      // favouriteSportIds: sports
    },
  };

  return (
    <FormContainer>
      <AvatarSelect wrapperStyle={styles.avatarWrapper} />
      <UTextInput label="Имя" value={firstName} onChange={changeFirstNameHandle} />
      <UTextInput label="Фамилия" value={lastName} onChange={changeLastNameHandle} />
      <UTextInput label="Никнейм" value={nickname} onChange={changeNicknameHandle} />
      <EditGender options={['Мужской', 'Женский']} label="Пол" />
    </FormContainer>
  );
  {
    /* <SubmitButton
        gql={EDIT_USER_MUTATION}
        variables={updateVariables}
        title="Сохранить"
        onError={handleApoloError}
      /> */
  }
}

const styles = StyleSheet.create({
  avatarWrapper: { marginHorizontal: -24 },
});
