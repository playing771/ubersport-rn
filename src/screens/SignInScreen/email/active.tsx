import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as Facebook from 'expo-facebook';
import { View as AnimatedView } from 'react-native-animatable';
import * as validator from 'validator';
import * as Google from 'expo-google-app-auth';
import UButton from '../../../components/buttons/UButton';
import { IActiveStepInjectedProps } from '../../../components/UWizard/index';
import { BASE_URL } from '../../../constants/Api';
import SignInFormInput from '../Input';
import { useMutation } from 'react-apollo';
import { CREATE_USER_GQL } from '../../../api/user/createUser';

const FB_APP_ID = '1375931069246551';
const GOOGLE_ANDROID_ID =
  '663195185664-9cd7205irs5opafld8mmvo0jr80b80ut.apps.googleusercontent.com';
const GOOGLE_IOS_ID = '663195185664-prmlk7hjkbhkcgfmbugsfbbvfo52fos1.apps.googleusercontent.com';

interface IProps extends IActiveStepInjectedProps {
  // onSubmit: (index: number, data: string) => void;
  // index: number;
}

const SignUpActive = ({ onSubmit, index }: IProps) => {
  const [mutate, { loading, error, data }] = useMutation(CREATE_USER_GQL);
  const handleGoogleAuth = async () => {
    const result = await Google.logInAsync({
      androidClientId: GOOGLE_ANDROID_ID,
      iosClientId: GOOGLE_IOS_ID,
      scopes: ['profile', 'email'],
    } as any);
    if (result.type === 'success') {
      const { user } = result;
      // mutate({
      //   variables: {
      //     email: user.email,
      //     firstName: user.givenName,
      //     lastName: user.familyName,
      //     avatar: user.photoUrl,
      //     external: 'google',
      //   },
      // });
      Alert.alert('Logged in!', `Hi ${user.email} \n ${user.familyName} ${user.givenName}!`);
    }
  };
  const handleFacebookAuth = async () => {
    // const facebookRedirectUrl = AuthSession.getRedirectUrl();
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        console.log('response', response);

        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
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
