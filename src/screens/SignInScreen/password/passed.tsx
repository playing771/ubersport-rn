import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PasswordInput } from '../../../components/inputs/PasswordInput';
import { IPassedStepInjectedProps } from '../../../components/UWizard/index';

interface IProps extends IPassedStepInjectedProps {
  onSubmit: any;
}

const PasswordPassed = ({ data, nextPassed, onSubmit, index }: IProps) => {
  return (
    !nextPassed && (
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.mainText}>Придумайте пароль для входа</Text>
          <Text style={styles.subText}>Минимум 6 символов</Text>
        </View>

        <View style={styles.inputsContainer}>
          <PasswordInput
            placeholder="Введите пароль"
            onChangeText={text => onSubmit(index, text)}
            defaultValue={data}
          />
        </View>
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
    borderBottomLeftRadius: 0,
  },

  mainText: { color: 'white', fontWeight: '600' },
  subText: { color: '#CBD6F2', marginTop: 6 },

  inputsContainer: { marginTop: 6 },
});

export default PasswordPassed;
