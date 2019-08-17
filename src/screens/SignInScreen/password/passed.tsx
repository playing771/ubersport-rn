import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IPassedStepInjectedProps } from '../../../components/UWizard/index';
import SignInFormInput from '../Input';

interface IProps extends IPassedStepInjectedProps {}

const PasswordPassed = ({ data, nextPassed }: IProps) => {
  return (
    !nextPassed && (
      <>
        {/* <AnimatedView
          animation="fadeIn"
          duration={1100}
          useNativeDriver={true}
          style={styles.titleContainer}
        > */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainText}>Придумайте пароль для входа</Text>
          <Text style={styles.subText}>Минимум 6 символов</Text>
        </View>
        {/* </AnimatedView> */}
        {/* <AnimatedView
          animation="fadeIn"
          useNativeDriver={true}
          duration={1100}
          delay={500}
        > */}
        <View style={styles.inputsContainer}>
          <SignInFormInput
            textContentType="password"
            secureTextEntry={true}
            placeholder="Введите пароль"
            icon="ios-key"
            defaultValue={data}
            editable={false}
          />
        </View>
        {/* </AnimatedView> */}
      </>
    )
  );
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
});

export default PasswordPassed;
