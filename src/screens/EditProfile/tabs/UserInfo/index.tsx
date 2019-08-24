import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import ULoader from '../../../../components/ULoader/index';
import UTextInput from '../../../../components/UTextInput/index';

import { USwitch as EditSex } from '../../../../components/Buttons/Switch';
import { EDIT_USER_MUTATION } from '../../gql';
import AvatarSelect from '../../AvatarSelect';

import { EditProfileFormContainer as FormContainer } from '../../FormContainer';
import ErrorGqlCard from '../../../../components/ErrorCard/ErrorGqlCard';
import { EditProfileSubmitButton as SubmitButton } from '../../SubmitButton';
import { useProfileUserInfoQuery } from './gql';

interface IProps {
  id: string;
}

export interface IEditProfileUserInfo {
  nickname: string;
  firstName: string;
  lastName: string;
  sex: string;
}

export default function UserInfoTab({ id }: IProps) {
  // const { loading, error, getUser } = data;

  // const { data, loading, error } = useQuery<IGetUserInfoResult, IGetUserInfoVariables>(
  //   GET_USER_INFO_GQL,
  //   { variables: { id } }
  // );

  const { data, loading, error } = useProfileUserInfoQuery({ id });

  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [nickname, setNickname] = useState('');

  const [info, setInfo] = useState<IEditProfileUserInfo>({
    firstName: '',
    lastName: '',
    nickname: '',
    sex: '',
  });

  useEffect(() => {
    if (data) {
      setInfo({ ...data.getUser });
    }
  }, [data]);

  // useEffect(() => {
  //   if (getUser) {
  //     setFirstName(getUser.firstName);
  //     setLastName(getUser.lastName);
  //     setNickname(getUser.nickname);
  //   }
  // }, [getUser]);

  if (error) {
    return <ErrorGqlCard error={error} position="BOTTOM" />;
  }

  const { getUser } = data;

  const changeFirstNameHandle = (firstName: string) => {
    setInfo({ ...info, firstName });
  };

  const changeLastNameHandle = (lastName: string) => {
    setInfo({ ...info, lastName });
  };

  const changeNicknameHandle = (nickname: string) => {
    setInfo({ ...info, nickname });
  };

  if (loading || !getUser) {
    return <ULoader />;
  }

  // const updateVariables: IEditProfileVariables = {
  //   id: getUser.id,
  //   userInput: {
  //     firstName,
  //     lastName,
  //     nickname,
  //     // favouriteSportIds: sports
  //   },
  // };

  const { firstName, lastName, nickname, sex } = data.getUser;

  return (
    <FormContainer>
      <AvatarSelect wrapperStyle={styles.avatarWrapper} />
      <UTextInput label="Имя" value={firstName} onChange={changeFirstNameHandle} />
      <UTextInput label="Фамилия" value={lastName} onChange={changeLastNameHandle} />
      <UTextInput label="Никнейм" value={nickname} onChange={changeNicknameHandle} />
      <EditSex options={['Мужской', 'Женский']} label="Пол" />
      <SubmitButton gql={EDIT_USER_MUTATION} variables={{}} />
    </FormContainer>
  );
  {
  }
}

const styles = StyleSheet.create({
  avatarWrapper: { marginHorizontal: -24 },
});
