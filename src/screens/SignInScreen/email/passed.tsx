import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { IPassedStepInjectedProps } from '../../../components/UWizard/index';
import PassedItemContainer from '../PassedItemContainer';

interface IProps extends IPassedStepInjectedProps {
  data: string;
}

const SignUpPassed = ({ data, toggleActiveStep, index }: IProps) => {
  return (
    <>
      <View style={[styles.titleContainer, styles.signUpTitleContainer]}>
        <Text style={[styles.mainText, styles.signUpMaintext]}>
          Войдите или зарегистрируйтесь
        </Text>
      </View>
      <PassedItemContainer
        onPressHandle={toggleActiveStep}
        text={data}
        index={index}
      />
    </>
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

  signUpTitleContainer: { width: '80%' },
  mainText: { color: 'white', fontWeight: '600' },
  signUpMaintext: { fontSize: 16 }
});

export default SignUpPassed;
