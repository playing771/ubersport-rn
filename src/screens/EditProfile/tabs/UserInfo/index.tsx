import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import ULoader from '../../../../components/ULoader/index';
import UTextInput from '../../../../components/UTextInput/index';

import { USwitch as EditSex } from '../../../../components/Buttons/Switch';
import AvatarSelect from '../../AvatarSelect';

import { EditProfileFormContainer as FormContainer } from '../../FormContainer';
import ErrorGqlCard from '../../../../components/ErrorCard/ErrorGqlCard';
import { EditProfileSubmitButton as SubmitButton } from '../../SubmitButton';
import { useEditProfileInfoQuery } from './gql';
import { ISex } from '../../../../api/user/types';
import { EDIT_PROFILE_MUTATION, IEditProfileVariables } from '../../gql';
import { deepOmit } from '../../../../other/helpers';

interface IProps {
  id: string;
}

export interface IEditProfileUserInfo {
  nickname: string;
  firstName: string;
  lastName: string;
  sex: ISex;
}

const initialUserInfo: IEditProfileUserInfo = {
  firstName: '',
  lastName: '',
  nickname: '',
  sex: 'MALE',
};

export default function UserInfoTab({ id }: IProps) {
  const { data, loading, error } = useEditProfileInfoQuery({ id });
  const [info, setInfo] = useState<IEditProfileUserInfo>(initialUserInfo);

  useEffect(() => {
    if (data) {
      setInfo({ ...data.getUserInfo });
    }
  }, [data]);

  if (error) {
    return <ErrorGqlCard error={error} position="BOTTOM" />;
  }

  const { getUserInfo } = data;

  const changeFirstNameHandle = (firstName: string) => {
    setInfo({ ...info, firstName });
  };

  const changeLastNameHandle = (lastName: string) => {
    setInfo({ ...info, lastName });
  };

  const changeNicknameHandle = (nickname: string) => {
    setInfo({ ...info, nickname });
  };

  const changeSexHandle = (sex: ISex) => {
    setInfo({ ...info, sex });
  };

  if (loading || !getUserInfo) {
    return <ULoader />;
  }

  const mutationVariables: IEditProfileVariables = {
    id,
    userInput: deepOmit(info, '__typename'),
  };

  return (
    <FormContainer>
      <AvatarSelect wrapperStyle={styles.avatarWrapper} />
      <UTextInput label="Имя" value={info.firstName} onChange={changeFirstNameHandle} />
      <UTextInput label="Фамилия" value={info.lastName} onChange={changeLastNameHandle} />
      <UTextInput label="Никнейм" value={info.nickname} onChange={changeNicknameHandle} />
      <EditSex options={['Мужской', 'Женский']} label="Пол" onChange={changeSexHandle} />
      <SubmitButton gql={EDIT_PROFILE_MUTATION} variables={mutationVariables} />
    </FormContainer>
  );
  {
  }
}

const styles = StyleSheet.create({
  avatarWrapper: { marginHorizontal: -24 },
});
