import React, { ReactElement } from 'react';
import withTouch from '../hocs/WIthTouch/index';
import { TextStyle, Text, StyleSheet } from 'react-native';

interface IProps {
  children: ReactElement | string;
  type?: 'simple' | 'danger';
  style?: TextStyle;
}

const TextButton = withTouch(({ children, type = 'simple', style }: IProps) => {
  return (
    <Text style={[style, type === 'danger' ? styles.danger : undefined]}>
      {children}
    </Text>
  );
});

const styles = StyleSheet.create({
  danger: { color: '#F84472' }
});

export default TextButton;
