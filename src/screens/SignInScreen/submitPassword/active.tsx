import React from 'react';
import { StyleSheet, View } from 'react-native';
import { View as AnimatedView } from 'react-native-animatable';
import { PasswordInput } from '../../../components/inputs/PasswordInput';
import { IActiveStepInjectedProps } from '../../../components/UWizard/index';

interface IProps extends IActiveStepInjectedProps {}

const SubmitPasswordActive = ({ onSubmit, index, prevData }: IProps) => {
  return (
    <AnimatedView animation="fadeIn" useNativeDriver={true} duration={500}>
      <View style={styles.inputsContainer}>
        <PasswordInput
          placeholder="Повторите пароль"
          onChangeText={text => onSubmit(index, text)}
        />
      </View>
    </AnimatedView>
  );
};

export const submitPasswordValidateFn = (data: string, prevData: string) => {
  const mp = typeof data === 'string' && typeof prevData === 'string' && data === prevData;
  // console.log(data, prevData, mp);

  return mp;
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

  inputsContainer: {},
});

export default SubmitPasswordActive;
