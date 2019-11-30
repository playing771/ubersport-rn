import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  children: ReactNode | ReactNode[];
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
    paddingVertical: 10,
  },
});
