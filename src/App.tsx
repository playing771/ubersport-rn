import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Platform, StatusBar, AppRegistry, Text } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { AppLoading, Notifications } from 'expo';
import * as Font from 'expo-font';
import { createAppContainer } from 'react-navigation';

import { AppContextProvider, uknonwUser } from './utils/context/sports';
import AppNavigator from './navigation/AppNavigator';
import { IUserWithToken } from './api/user/types';
import { client } from './client';
import registerForPushNotificationsAsync from './notifiactions';

const NavigatorWrapper = createAppContainer(AppNavigator);

interface IProps {
  skipLoadingScreen: boolean;
}

export default function App(props: IProps) {
  const { skipLoadingScreen } = props;
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [user, setUser] = useState(uknonwUser);
  const [notification, setNotifications] = useState({}) as any;

  useEffect(() => {
    let _notificationSubscription;
    registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    _notificationSubscription = Notifications.addListener(handleNotification);
  });
  const handleNotification = (notification: any) => {
    setNotifications(notification);
    console.log('NOTIFACTION', notification);
    setTimeout(() => setNotifications({}), 2000);
  };
  const setLoggedInUserHandle = (userInput: IUserWithToken) => {
    setUser(userInput);
  };
  const handleFinishLoading = () => {
    setLoadingComplete(true);
    registerForPushNotificationsAsync();
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
          {notification.origin && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
              }}
            >
              <Text>Origin: {notification && notification.origin}</Text>
              <Text>
                Data: {JSON.stringify(notification && notification.data && notification.data.body)}
              </Text>
            </View>
          )}
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
