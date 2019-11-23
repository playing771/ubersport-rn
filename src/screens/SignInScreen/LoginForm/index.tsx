import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { View as AnimatedView } from 'react-native-animatable';
import UButton from '../../../components/buttons/UButton/index';
import Colors from '../../../constants/Colors';
import useForm from '../../../hooks/UseForm/index';
import SignInFormInput from '../Input';
import PassedItemContainer from '../PassedItemContainer';
import SignInScreenTitle from '../Title';

interface IProps {
  userEmail: string;
  submitHandle: (email: string, password: string) => void;
  loading: boolean;
  hideErroHandle: () => void;
  changeEmailHandle: () => void;
}

const LoginForm = ({
  userEmail,
  submitHandle,
  loading,
  hideErroHandle,
  changeEmailHandle,
}: IProps) => {
  const { values, useTextInput, isValid } = useForm({ password: '' });
  // console.log('values', values);

  const pressBtnHandle = () => {
    submitHandle(userEmail, values.password);
  };

  return (
    <>
      <SignInScreenTitle user={userEmail} text="Здравствуйте" />
      <View style={styles.mainContainer}>
        <AnimatedView animation="fadeIn" duration={1100} useNativeDriver={true}>
          <View style={styles.titleContainer}>
            <Text style={styles.mainText}>Войдите или зарегистрируйтесь</Text>
          </View>
          <PassedItemContainer
            onPressHandle={changeEmailHandle}
            text={userEmail}
            // index={index}
          />
        </AnimatedView>
        <AnimatedView animation="fadeIn" useNativeDriver={true} duration={1100} delay={500}>
          <View style={styles.inputsContainer}>
            <View style={[styles.titleContainer, styles.passwordTitleContainer]}>
              <Text style={styles.mainText}>Введите пароль, чтобы войти</Text>
            </View>
            <SignInFormInput
              textContentType="password"
              secureTextEntry={true}
              placeholder="Введите пароль"
              icon="ios-key"
              {...useTextInput<string>('password', 'isRequired', hideErroHandle)}
            />
            <UButton
              title="Войти"
              style={styles.submitButton}
              backgroundColor={Colors.green}
              textStyle={styles.submitButtonTitle}
              onPress={pressBtnHandle}
              disabled={!isValid}
              loading={loading}
              loadingIndicatorColor="white"
            />
          </View>
        </AnimatedView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, paddingTop: 24, paddingHorizontal: 24 },
  titleContainer: {
    // backgroundColor: 'white',
    backgroundColor: '#505B77',
    padding: 16,
    borderRadius: 14,
    borderBottomLeftRadius: 0,
    width: '80%',
  },
  passwordTitleContainer: { width: '100%' },
  mainText: { color: 'white', fontWeight: '600', fontSize: 16 },
  inputsContainer: { marginTop: 6 },
  submitButton: { marginTop: 12, height: 42, borderRadius: 6 },
  submitButtonTitle: { fontSize: 16, fontWeight: '500' },
});

export default LoginForm;
