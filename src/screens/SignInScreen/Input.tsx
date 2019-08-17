import React from 'react';
import TextInputWithIcon from '../../components/TextInputWithIcon/index';
import { TextInputProps, StyleSheet } from 'react-native';

interface IProps extends TextInputProps {
  icon?: string;
  // children?: ComponentType;
  // containerStyle?: StyleProp<ViewStyle>;
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
    // lineHeight: 42,
    // borderRadius: 6,
    // paddingHorizontal: 6,
    color: '#5F6B8D'
  }
});

export default SignInFormInput;
