import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardView } from '../../components/KeyboardVew';

interface IProps {
  children: ReactElement | ReactElement[];
  withKeyboard?: boolean;
}

export function EditProfileFormContainer({ children, withKeyboard = true }: IProps) {
  const UView = withKeyboard ? KeyboardView : View;
  return <UView style={styles.mainContainer}>{children}</UView>;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
});
