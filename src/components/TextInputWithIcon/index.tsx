import { Ionicons } from '@expo/vector-icons';
import React, { ComponentType } from 'react';
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

interface IProps extends TextInputProps {
  icon?: string;
  children?: ComponentType;
  containerStyle?: ViewStyle;
}

export default function TextInputWithIcon({
  icon,
  children,
  containerStyle,
  style,
  ...textInputProps
}: IProps) {
  return (
    <View style={[styles.mainContainer, containerStyle]}>
      {icon ? <Ionicons size={18} name={icon} style={styles.icon} /> : children}
      <TextInput style={[styles.input, style]} {...textInputProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',

    alignItems: 'center',
  },
  input: { flex: 1 },
  icon: {
    paddingHorizontal: 12,
    color: '#9CA5BF',
    backgroundColor: 'white',
    height: 42,
    lineHeight: 42,
  },
});
