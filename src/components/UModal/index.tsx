import React, { ReactElement } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface IProps {
  children: ReactElement | ReactElement[];
  style?: ViewStyle;
}

export default function UModal({ children, style }: IProps) {
  return <View style={[styles.mainContainer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 18,
    paddingVertical: 10
  }
});
