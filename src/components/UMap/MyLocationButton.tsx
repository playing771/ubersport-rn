import React from 'react';
import { StyleSheet } from 'react-native';
import UButton from '../buttons/UButton';

interface IProps {
  onPress: () => void;
  loading: boolean;
}

export default function MyLocationButton({ onPress, loading }: IProps) {
  return (
    <UButton
      icon="ios-compass"
      style={styles.compassBtn}
      backgroundColor="#f1f1f1"
      iconStyle={styles.icon}
      rounded={true}
      onPress={onPress}
      loading={loading}
      disabled={loading}
      disabledNoStyles={true}
    />
  );
}

const styles = StyleSheet.create({
  compassBtn: {
    width: 52,
    height: 48,
    position: 'absolute',
    bottom: 70,
    right: 10,
    zIndex: 99,
    paddingVertical: 5,
  },
  icon: { fontSize: 34, color: '#596588' },
});
