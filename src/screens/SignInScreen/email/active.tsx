import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthSession } from 'expo';
import { View as AnimatedView } from 'react-native-animatable';
import * as validator from 'validator';
import UButton from '../../../components/buttons/UButton';
import { IActiveStepInjectedProps } from '../../../components/UWizard/index';
import SignInFormInput from '../Input';
import { BASE_URL } from '../../../constants/Api';

const redirectUrl = `${BASE_URL}/auth/google`;
const GOOGLE_WEB_APPID = '663195185664-q7n8a52ef30nq3htv4cr61lbkqso3b0k.apps.googleusercontent.com';
const FB_APP_ID = '1375931069246551';

interface IProps extends IActiveStepInjectedProps {
  // onSubmit: (index: number, data: string) => void;
  // index: number;
}

const SignUpActive = ({ onSubmit, index }: IProps) => {
  const handleGoogleAuth = async () => {
    const result = await AuthSession.startAsync({
      authUrl:
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `&client_id=${GOOGLE_WEB_APPID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&response_type=code` +
        `&access_type=offline` +
        `&scope=profile`,
    });
    console.log('result', result);
    return result;
  };
  const handleFacebookAuth = async () => {
    // const facebookRedirectUrl = AuthSession.getRedirectUrl();
    const result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });
    console.log('result', result);
    return result;
  };
  return (
    <>
      <AnimatedView
        animation="fadeIn"
        duration={1100}
        useNativeDriver={true}
        style={styles.titleContainer}
      >
        <Text style={styles.mainText}>Войдите или зарегистрируйтесь</Text>
        <Text style={styles.subText}>
          чтобы получить возможность присоединиться к уже созданным играм или создавать свои
        </Text>
      </AnimatedView>
      <AnimatedView animation="fadeIn" useNativeDriver={true} duration={1100} delay={300}>
        <View style={styles.socialContainer}>
          {/* <UButton
            icon="logo-vk"
            circle={true}
            backgroundColor="#507498"
            style={styles.socialIcon}
          />
          <UButton circle={true} backgroundColor="#3B5899" style={styles.socialIcon}>
            <EvilIcons name="sc-facebook" style={styles.fbIcon} />
          </UButton>*/}
          <UButton
            onPress={handleGoogleAuth}
            style={{ flex: 1, height: 42, marginTop: 6 }}
            iconSize={24}
            rounded={true}
            icon="logo-google"
            backgroundColor="#DF2A30"
            title="Войти с помощью Google"
            textStyle={{ fontSize: 16, fontWeight: '500' }}
          />
          <UButton
            onPress={handleFacebookAuth}
            style={{ flex: 1, height: 42, marginTop: 12 }}
            iconSize={24}
            rounded={true}
            icon="logo-facebook"
            backgroundColor="#3B5899"
            title="Войти с помощью Facebook"
            textStyle={{ fontSize: 16, fontWeight: '500' }}
          />
        </View>
      </AnimatedView>
      <AnimatedView animation="fadeIn" useNativeDriver={true} duration={1100} delay={500}>
        <Text style={styles.orText}>Или</Text>
        <View style={styles.inputsContainer}>
          <SignInFormInput
            textContentType="emailAddress"
            placeholder="Введите email"
            icon="ios-person"
            onChangeText={text => onSubmit(index, text)}
            autoCapitalize="none"
          />
        </View>
      </AnimatedView>
    </>
  );
};

export function validateEmail(text?: string) {
  if (!text) {
    return false;
  }
  return validator.isEmail(text);
}

const styles = StyleSheet.create({
  titleContainer: {
    // backgroundColor: 'white',
    backgroundColor: '#505B77',
    padding: 16,
    borderRadius: 14,
    borderBottomLeftRadius: 0,
  },
  socialIcon: {
    marginRight: 12,
  },
  fbIcon: {
    fontSize: 32,
    color: 'white',
    marginLeft: -2,
  },
  mainText: { color: 'white', fontWeight: '600' },
  subText: { color: '#CBD6F2', marginTop: 6 },
  orText: {
    color: '#636F8F',
    // marginTop: 6,
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  socialContainer: {
    // flexDirection: 'row',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  inputsContainer: {},
});

export default SignUpActive;
