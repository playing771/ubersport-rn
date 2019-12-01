import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { View as AnimatedView } from 'react-native-animatable';
import { IActiveStepInjectedProps } from '../../../components/UWizard/index';
import SignInFormInput from '../Input';

interface IProps extends IActiveStepInjectedProps {}

const initialInfoState = { name: '', lastName: '', login: '' };

const UserInfoActive = ({ onSubmit, index }: IProps) => {
  const [name, setName] = useState(initialInfoState.name);
  const [lastName, setLastName] = useState(initialInfoState.lastName);
  const [login, setLogin] = useState(initialInfoState.login);

  useEffect(() => {
    onSubmit(index, { name, lastName, login });
  }, [name, lastName, login]);

  return (
    <>
      <AnimatedView
        animation="fadeIn"
        duration={1100}
        useNativeDriver={true}
        style={[styles.titleContainer, styles.userInfoContainer]}
      >
        <Text style={styles.mainText}>Пожалуйста, укажите дополнительную информацию о себе</Text>
        <Text style={styles.subText}>Обязательные поля отмечены звездочкой</Text>
      </AnimatedView>
      <AnimatedView animation="fadeIn" useNativeDriver={true} duration={1100} delay={500}>
        <View style={styles.inputsContainer}>
          <SignInFormInput
            textContentType="username"
            placeholder="Придумайте свой логин"
            icon="ios-contact"
            onChangeText={setLogin}
            value={login}
          />
          <SignInFormInput
            textContentType="familyName"
            placeholder="Укажите фамилию"
            icon="ios-contact"
            onChangeText={text => setLastName(text)}
          />
          <SignInFormInput
            textContentType="name"
            placeholder="Укажите имя"
            icon="ios-contact"
            onChangeText={setName}
            value={name}
          />
        </View>
      </AnimatedView>
    </>
  );
};

export const userInfnoValidateFn = (data: string) => {
  return typeof data === 'string' && data.length >= 6;
};

const styles = StyleSheet.create({
  titleContainer: {
    // backgroundColor: 'white',
    backgroundColor: '#505B77',
    padding: 16,
    borderRadius: 14,
    borderBottomLeftRadius: 0,
  },
  mainText: { color: 'white', fontWeight: '600' },
  subText: { color: '#CBD6F2', marginTop: 6 },
  inputsContainer: { marginTop: 6 },
  userInfoContainer: { marginTop: 12, paddingRight: 24 },
});

export default UserInfoActive;
