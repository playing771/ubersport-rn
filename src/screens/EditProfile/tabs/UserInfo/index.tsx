import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ISex } from '../../../../api/user/types';
import { USwitch as EditSex } from '../../../../components/buttons/Switch';
import ErrorCard from '../../../../components/ErrorCard';
import ULoader from '../../../../components/ULoader/index';
import UTextInput from '../../../../components/UTextInput/index';
import { deepOmit } from '../../../../utils/helpers';
import AvatarSelect from '../../AvatarSelect';
import { ProfileAgeInput } from '../../controls/AgeInput';
import SubmitButton from '../../controls/SubmitButton';
import { EditProfileFormContainer as FormContainer } from '../../FormContainer';
import { EDIT_PROFILE_MUTATION, IEditProfileVariables } from '../../gql';
import { useEditProfileInfoQuery } from './gql';
import { useUserInfoForm } from './useUserInfoForm';

interface IProps {
  id: string;
}

export interface IEditProfileUserInfo {
  nickname?: string;
  firstName?: string;
  lastName?: string;
  sex?: ISex;
  avatar?: string | null;
  dateOfBirth?: number;
}

export default function UserInfoTab({ id }: IProps) {
  const { data, loading, error } = useEditProfileInfoQuery({ id });
  const { newInfo, setNewInfo, isValid } = useUserInfoForm();

  useEffect(() => {
    // to make validation work
    if (data) {
      setNewInfo(data.getUserInfo);
    }
  }, [data]);

  if (error) {
    return <ErrorCard error={error} position="BOTTOM" />;
  }

  if (!data) {
    return <></>;
  }

  const { getUserInfo } = data;

  const changeFirstNameHandle = (firstName: string) => {
    const tmo = { ...newInfo, firstName };
    setNewInfo(tmo);
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

  const changeDateOfBirth = (dateOfBirth: number) => {
    setNewInfo({ ...newInfo, dateOfBirth });
  };

  const changeAvatarHandle = (newAvatar: string | null) => {
    setNewInfo({ ...newInfo, avatar: newAvatar });
  };

  if (loading || !getUserInfo) {
    return <ULoader />;
  }

  const mutationVariables: IEditProfileVariables = {
    id,
    userInput: deepOmit(newInfo, '__typename'),
  };

  return (
    <FormContainer>
      <AvatarSelect
        wrapperStyle={styles.avatarWrapper}
        onChange={changeAvatarHandle}
        value={getAvatarSrc(newInfo, data.getUserInfo.avatar)}
      />
      <UTextInput
        label="Имя"
        initialValue={data.getUserInfo.firstName}
        onChangeText={changeFirstNameHandle}
      />
      <UTextInput
        label="Фамилия"
        initialValue={data.getUserInfo.lastName}
        onChangeText={changeLastNameHandle}
      />
      <UTextInput
        label="Никнейм"
        initialValue={data.getUserInfo.nickname}
        onChangeText={changeNicknameHandle}
      />
      <ProfileAgeInput
        initialDate={data.getUserInfo.dateOfBirth}
        changeDateHandle={changeDateOfBirth}
      />

      <EditSex
        options={[
          { label: 'Мужской', value: 'MALE' },
          { label: 'Женский', value: 'FEMALE' },
        ]}
        label="Пол"
        onChange={changeSexHandle}
        initialValue={data.getUserInfo.sex}
      />
      <SubmitButton gql={EDIT_PROFILE_MUTATION} variables={mutationVariables} disabled={!isValid} />
    </FormContainer>
  );
}

function getAvatarSrc(
  info: IEditProfileUserInfo | undefined,
  fetchedAvatar: string | null | undefined
) {
  if (info === undefined) {
    // если аватар не выбран, то показываем аватара с сервера или пустой аватар
    return fetchedAvatar ? fetchedAvatar : null;
  }

  if (!!!info.avatar) {
    return null;
  }
  // если выбран аватар, покащываем его
  return info.avatar ? info.avatar : fetchedAvatar;
}

const styles = StyleSheet.create({
  avatarWrapper: { marginLeft: -24, marginRight: -24 },
});
