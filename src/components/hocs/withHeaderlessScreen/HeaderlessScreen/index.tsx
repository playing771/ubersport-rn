import React, { ReactElement } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import CloseButton from './CloseButton';
import useNavigation from '../../../../hooks/useNavigation';
import sharedStyles from '../../../../sharedStyles';

interface IProps {
  children: ReactElement | ReactElement[];
  title: string;
}

export default function HeaderLessScreen({ children, title }: IProps) {
  const { goBack } = useNavigation();

  const closeHanlde = () => {
    goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={sharedStyles.paddingHorizontal}>
          <CloseButton onPress={closeHanlde} />
        </View>
        <View style={sharedStyles.paddingHorizontal}>
          <Text style={styles.header}>{title}</Text>
        </View>
        <View style={[styles.contentContainer, sharedStyles.paddingHorizontal]}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    color: '#333',
    // color: 'white',
    fontSize: 26,
    // fontFamily: 'Avenir',
    fontWeight: '700',
    paddingVertical: 20,
    width: '80%',
  },
  contentContainer: {
    paddingTop: 24,
    backgroundColor: '#F1F1F5',
    flex: 1,
  },
});
