import React from 'react';
import { StyleSheet } from 'react-native';
import UButton from '../buttons/UButton';

interface IProps {
  onPress: () => void;
}

export default function MyLocationButton({ onPress }: IProps) {
  return (
    <UButton
      icon="ios-compass"
      style={styles.compassBtn}
      backgroundColor="#f1f1f1"
      iconStyle={styles.icon}
      rounded={true}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  compassBtn: {
    // width: 40,
    // height: 40,
    position: 'absolute',
    bottom: 70,
    right: 10,
    zIndex: 99,
    paddingVertical: 5,
  },
  icon: { fontSize: 34, color: '#596588' },
});
