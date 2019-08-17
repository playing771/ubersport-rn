import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { View as AnimatedView } from 'react-native-animatable';
import { IPassedStepInjectedProps } from '../../../components/UWizard/index';
import PassedItemContainer from '../PassedItemContainer';

interface IProps extends IPassedStepInjectedProps {
  data: string;
}

const SubmitPasswordPassed = ({ data, toggleActiveStep, index }: IProps) => {
  return (
    <>
      <AnimatedView
        animation="fadeIn"
        duration={500}
        useNativeDriver={true}
        style={[styles.titleContainer, styles.passwordContainer]}
      >
        <Text style={[styles.mainText, styles.passwordMaintext]}>
          Придумайте пароль для входа
        </Text>
      </AnimatedView>
      <AnimatedView
        animation="fadeIn"
        useNativeDriver={true}
        duration={1100}
        delay={500}
      >
        <PassedItemContainer
          onPressHandle={toggleActiveStep}
          text={getPasswordtext(data)}
          index={index}
        />
      </AnimatedView>
    </>
  );
};

function getPasswordtext(data: string = '') {
  return Array.from(data)
    .fill('*')
    .join('');
}

const styles = StyleSheet.create({
  titleContainer: {
    // backgroundColor: 'white',
    backgroundColor: '#505B77',
    padding: 16,
    borderRadius: 14,
    borderBottomLeftRadius: 0
  },
  passwordContainer: { width: '80%' },
  mainText: { color: 'white', fontWeight: '600', fontSize: 16 },
  passwordMaintext: { fontSize: 16 }
});

export default SubmitPasswordPassed;
