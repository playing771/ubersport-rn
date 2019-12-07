import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import useToggle from '../../hooks/useToggle';
import withTouch from '../hocs/WIthTouch';
import TextInputWithIcon from '../TextInputWithIcon';

type RestTextInputProps = Omit<TextInputProps, 'textContentType' | 'secureTextEntry'>;

interface IProps extends RestTextInputProps {}

const EyeButton = withTouch(Ionicons) as any;

export function PasswordInput(props: IProps) {
  const [isActive, , , toggle] = useToggle(true);

  function hadleEyePress() {
    toggle(!isActive);
  }

  return (
    <>
      <TextInputWithIcon
        placeholderTextColor="#5F6B8D"
        textContentType="password"
        secureTextEntry={isActive}
        icon="ios-key"
        style={styles.input}
        containerStyle={styles.inputWrapper}
        {...props}
      />
      <EyeButton
        size={18}
        name={isActive ? 'ios-eye' : 'ios-eye-off'}
        color="#5F6B8D"
        style={styles.eyeIcon}
        onPress={hadleEyePress}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputWrapper: { marginTop: 12 },
  input: {
    backgroundColor: 'white',
    height: 42,
    color: '#5F6B8D',
  },
  eyeIcon: { position: 'absolute', right: 12, bottom: 10 },
});
