import React, { ReactElement } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, View } from 'react-native';

interface IProps {
  children: ReactElement | ReactElement[];
  withKeyboard?: boolean;
}

export function EditProfileFormContainer({ children, withKeyboard = true }: IProps) {
  const UView = withKeyboard ? KeyboardAwareScrollView : View;
  return <UView style={styles.mainContainer}>{children}</UView>;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
});
