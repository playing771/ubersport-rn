import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { View as AnimatedView } from 'react-native-animatable';
import { IActiveStepInjectedProps } from '../../../components/UWizard/index';
import SignInFormInput from '../Input';

interface IProps extends IActiveStepInjectedProps {}

const PasswordActive = ({ onSubmit, index }: IProps) => {
  return (
    <>
      <AnimatedView
        animation="fadeIn"
        duration={3}
        useNativeDriver={true}
        style={styles.titleContainer}
      >
        <Text style={styles.mainText}>Придумайте пароль для входа</Text>
        <Text style={styles.subText}>Минимум 6 символов</Text>
      </AnimatedView>
      <AnimatedView
        animation="fadeIn"
        useNativeDriver={true}
        duration={1100}
        delay={500}
      >
        <View style={styles.inputsContainer}>
          <SignInFormInput
            textContentType="password"
            secureTextEntry={true}
            placeholder="Введите пароль"
            icon="ios-key"
            onChangeText={text => onSubmit(index, text)}
          />
        </View>
      </AnimatedView>
    </>
  );
};

export const passwordValidateFn = (data: string) => {
  return typeof data === 'string' && data.length >= 6;
};

const styles = StyleSheet.create({
  titleContainer: {
    // backgroundColor: 'white',
    backgroundColor: '#505B77',
    padding: 16,
    borderRadius: 14,
    borderBottomLeftRadius: 0
  },
  mainText: { color: 'white', fontWeight: '600' },
  subText: { color: '#CBD6F2', marginTop: 6 },
  inputsContainer: { marginTop: 6 }
  // inputWrapper: { marginTop: 12 },
  // input: {
  //   backgroundColor: 'white',
  //   height: 42,
  //   lineHeight: 42,
  //   // borderRadius: 6,
  //   // paddingHorizontal: 6,
  //   color: '#5F6B8D'
  // }
});

export default PasswordActive;
