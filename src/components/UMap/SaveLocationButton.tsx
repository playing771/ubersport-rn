import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import UButton from '../buttons/UButton';

interface IProps {
  onPress: () => void;
  disabled: boolean;
}

export default function SaveLocationButton({ onPress, disabled }: IProps) {
  return (
    <UButton
      style={styles.submitBtn}
      title="Сохранить"
      icon="ios-checkmark-circle"
      iconStyle={styles.submitBtnIcon}
      textStyle={styles.submitBtnText}
      backgroundColor={Colors.green}
      rounded={true}
      onPress={onPress}
      disabled={disabled}
    />
  );
}

const styles = StyleSheet.create({
  submitBtn: {
    alignSelf: 'center',
    bottom: 10,
    zIndex: 999,
    width: '95%',
    height: 50,
    position: 'absolute',
  },
  submitBtnIcon: { fontSize: 24 },
  submitBtnText: { fontSize: 16 },
});
