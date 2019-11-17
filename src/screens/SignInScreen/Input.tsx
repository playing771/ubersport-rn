import React from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import TextInputWithIcon from '../../components/TextInputWithIcon/index';

interface IProps extends TextInputProps {
  icon?: string;
}

const SignInFormInput = (props: IProps) => {
  return (
    <TextInputWithIcon
      placeholderTextColor="#5F6B8D"
      style={styles.input}
      containerStyle={styles.inputWrapper}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  inputWrapper: { marginTop: 12 },
  input: {
    backgroundColor: 'white',
    height: 42,
    color: '#5F6B8D',
  },
});

export default SignInFormInput;
