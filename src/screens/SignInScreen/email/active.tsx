import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { View as AnimatedView } from 'react-native-animatable';
import UButton from '../../../components/buttons/UButton';
import { EvilIcons } from '@expo/vector-icons';
import { IActiveStepInjectedProps } from '../../../components/UWizard/index';
import SignInFormInput from '../Input';
import * as validator from 'validator';

interface IProps extends IActiveStepInjectedProps {
  // onSubmit: (index: number, data: string) => void;
  // index: number;
}

const SignUpActive = ({ onSubmit, index }: IProps) => {
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
          чтобы получить возможность присоединиться к уже созданным играм или
          создавать свои
        </Text>
      </AnimatedView>
      <AnimatedView
        animation="fadeIn"
        useNativeDriver={true}
        duration={1100}
        delay={300}
      >
        <View style={styles.socialContainer}>
          <UButton
            icon="logo-vk"
            circle={true}
            backgroundColor="#507498"
            style={styles.socialIcon}
          />
          <UButton
            circle={true}
            backgroundColor="#3B5899"
            style={styles.socialIcon}
          >
            <EvilIcons name="sc-facebook" style={styles.fbIcon} />
          </UButton>
          <UButton
            circle={true}
            icon="logo-googleplus"
            backgroundColor="#DF2A30"
          />
        </View>
      </AnimatedView>
      <AnimatedView
        animation="fadeIn"
        useNativeDriver={true}
        duration={1100}
        delay={500}
      >
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
    borderBottomLeftRadius: 0
  },
  socialIcon: {
    marginRight: 12
  },
  fbIcon: {
    fontSize: 32,
    color: 'white',
    marginLeft: -2
  },
  mainText: { color: 'white', fontWeight: '600' },
  subText: { color: '#CBD6F2', marginTop: 6 },
  orText: {
    color: '#636F8F',
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 24
  },
  inputsContainer: {}
});

export default SignUpActive;
