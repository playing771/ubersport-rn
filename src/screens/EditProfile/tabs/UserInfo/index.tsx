import React, { useState } from 'react';
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
  avatar: string | null;
}

const initialUserInfo: IEditProfileUserInfo | null = null;

export default function UserInfoTab({ id }: IProps) {
  const { data, loading, error } = useEditProfileInfoQuery({ id });
  const [newInfo, setNewInfo] = useState<IEditProfileUserInfo>(initialUserInfo);

  if (error) {
    return <ErrorGqlCard error={error} position="BOTTOM" />;
  }

  const { getUserInfo } = data;

  const changeFirstNameHandle = (firstName: string) => {
    setNewInfo({ ...newInfo, firstName });
  };

  const changeLastNameHandle = (lastName: string) => {
    setNewInfo({ ...newInfo, lastName });
  };

  const changeNicknameHandle = (nickname: string) => {
    setNewInfo({ ...newInfo, nickname });
  };

  const changeSexHandle = (sex: string) => {
    setNewInfo({ ...newInfo, sex: sex as ISex });
  };

  const changeAvatarHandle = (newAvatar: string | null) => {
    // console.log('changeAvatarHandle', newAvatar);

    setNewInfo({ ...newInfo, avatar: newAvatar });
  };

  if (loading || !getUserInfo) {
    return <ULoader />;
  }

  const mutationVariables: IEditProfileVariables = {
    id,
    userInput: deepOmit(newInfo, '__typename'),
  };

  // console.log('UserInfoTab', getUserInfo);

  // console.log('mutationVariables', mutationVariables);

  return (
    <FormContainer>
      <AvatarSelect
        wrapperStyle={styles.avatarWrapper}
        onChange={changeAvatarHandle}
        value={data.getUserInfo.avatar}
      />
      <UTextInput
        label="Имя"
        initialValue={data.getUserInfo.firstName}
        onChange={changeFirstNameHandle}
      />
      <UTextInput
        label="Фамилия"
        initialValue={data.getUserInfo.lastName}
        onChange={changeLastNameHandle}
      />
      <UTextInput
        label="Никнейм"
        initialValue={data.getUserInfo.nickname}
        onChange={changeNicknameHandle}
      />
      <EditSex
        options={[{ label: 'Мужской', value: 'MALE' }, { label: 'Женский', value: 'FEMALE' }]}
        label="Пол"
        onChange={changeSexHandle}
        initialValue={data.getUserInfo.sex}
      />
      <SubmitButton
        gql={EDIT_PROFILE_MUTATION}
        variables={mutationVariables}
        disabled={newInfo === null}
      />
    </FormContainer>
  );
  {
  }
}

const styles = StyleSheet.create({
  avatarWrapper: { marginHorizontal: -24 },
});
