import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Platform, StatusBar, AppRegistry } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { createAppContainer } from 'react-navigation';

import { AppContextProvider, uknonwUser } from './utils/context/sports';
import AppNavigator from './navigation/AppNavigator';
import { IUserWithToken } from './api/user/types';
import { client } from './client';

const NavigatorWrapper = createAppContainer(AppNavigator);

interface IProps {
  skipLoadingScreen: boolean;
}

export default function App(props: IProps) {
  const { skipLoadingScreen } = props;
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [user, setUser] = useState(uknonwUser);

  const setLoggedInUserHandle = (userInput: IUserWithToken) => {
    setUser(userInput);
  };
  const handleFinishLoading = () => {
    setLoadingComplete(true);
  };

  const loadResourcesAsync = async () => {
    return Font.loadAsync({
      // Roboto: require('native-base/Fonts/Roboto.ttf'),
      // Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      // Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
    });
  };

  const handleLoadingError = (error: Error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };
  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
    );
  }
  return (
    <ApolloProvider client={client}>
      <AppContextProvider
        value={{
          // sports,
          user,
          setUser: setLoggedInUserHandle,
        }}
      >
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigatorWrapper />
        </View>
      </AppContextProvider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('MyApplication', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FED2C9",
    // alignItems: 'center', // shit happens if set :(
    justifyContent: 'center',
  },
});
