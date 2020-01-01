import Constants from 'expo-constants';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { View as AnimatedView } from 'react-native-animatable';
import * as validator from 'validator';
import UButton from '../../../components/buttons/UButton';
import { IActiveStepInjectedProps } from '../../../components/UWizard/index';
import SignInFormInput from '../Input';

const { facebookAppId } = Constants.manifest;

interface IProps extends IActiveStepInjectedProps {}

const SignUpActive = ({ onSubmit, index, onSkip }: IProps) => {
  const config = {
    scopes: ['profile', 'email'],
    androidClientId: '915157576336-jets732sgki8bcjugh0f4b14bccbipug.apps.googleusercontent.com',
    androidStandaloneAppClientId:
      '915157576336-1s9b5icava9lrsbrliop4eu0jbpnmlfb.apps.googleusercontent.com',
  } as any;
  const handleGoogleAuth = async () => {
    try {
      const result = await Google.logInAsync(config);
      console.log('result.type', result.type);

      if (result.type === 'success') {
        const { user, idToken } = result;
        const { email } = user;
        if (onSkip && idToken && email) {
          onSkip({ email, idToken, external: 'GOOGLE' });
        }
      } else {
        Alert.alert('Something go wrong');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleFacebookAuth = async () => {
    try {
      await Facebook.initializeAsync(facebookAppId, 'ubersport');
      const { type, token } = (await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      })) as any;
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`
        );
        const { email } = await response.json();

        if (onSkip && token && email) {
          onSkip({ email, idToken: token, external: 'FACEBOOK' });
        }
      }
    } catch ({ message }) {
      console.log('message', message);
    }
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
            onChangeText={text => onSubmit(index, text.trim())}
            autoCapitalize="none"
            autoCompleteType="email"
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
