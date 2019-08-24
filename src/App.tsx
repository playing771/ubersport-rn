import React from 'react';
import { StyleSheet, View, Platform, StatusBar, AppRegistry } from 'react-native';

import { ApolloClient } from 'apollo-client';
// import { ApolloProvider } from 'react-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import AppNavigator from './navigation/AppNavigator';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { AppContextProvider, uknonwUser } from './other/context/sports';
import { setContext } from 'apollo-link-context';
import { concat } from 'apollo-link';
import { createAppContainer } from 'react-navigation';
import ISport from './api/sports/Sport.type';
import { IUserWithToken } from './api/user/types';
import { AsyncStorage } from 'react-native';

//  TODO: поменять на динамическую загрузку с сервера данны по видам
// спорта
const sports: { [key: string]: ISport } = {
  Football: {
    name: 'Football',
    id: 1,
  },
  Basketball: {
    name: 'Basketball',
    id: 2,
  },
  Volleyball: {
    name: 'Volleyball',
    id: 3,
  },
  Paintball: {
    name: 'Paintball',
    id: 4,
  },
  Tennis: {
    name: 'Tennis',
    id: 5,
  },
  Bicycle: {
    name: 'Bicycle',
    id: 6,
  },
};

// const user = {
//   id: '5cbaff053905710024d52151',
//   favoriteSports: [{ id: '5b9396d521a69fd62c5e0208', name: 'Футбол' }]
// };

const authLink = setContext(async (req, { headers }) => {
  // const fetched = await fetch('https://ubersport.ru/auth/token');
  // const response = await login();

  // const token = response ? response.accessToken : undefined;
  // console.log(response.user);
  const user = await AsyncStorage.getItem('user');
  const token = user ? (JSON.parse(user) as IUserWithToken).token : undefined;

  // const response: {
  //   expiresIn: number;
  //   accessToken: string;
  // } = await fetched.json();
  // const token = response;
  // const result = await fetch('https://ubersport.ru/auth/login');
  // const token = // TODO: real token implementation
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwiaWQiOiIxMjMiLCJpYXQiOj' +
  //   'E1NDk3MTA2NDAsImV4cCI6MTU0OTcxNDI0MH0.HTYzC0iMSozdSQwxwkeSCu3jVVaHOdcVkQL5ramuPRU';
  // console.log(token);

  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

const NavigatorWrapper = createAppContainer(AppNavigator);

const httpLink = new HttpLink({
  uri: 'https://ubersport.ru/graphql',
  // uri: "http://localhost:3000/graphql"
});
// Create the client as outlined in the setup guide

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authLink, httpLink),
});

interface IProps {
  skipLoadingScreen: boolean;
}

interface IAppState {
  isLoadingComplete: boolean;
  user: IUserWithToken;
}
export default class App extends React.Component<IProps, IAppState> {
  state = {
    isLoadingComplete: false,
    user: uknonwUser,
  };

  setLoggedInUserHandle = (user: IUserWithToken) => {
    this.setState({ user });
  };

  render() {
    const { isLoadingComplete, user } = this.state;
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <ApolloProvider client={client}>
          {/* TODO: поменять на динамическую загрузку с сервера данны по видам
          спорта */}
          <AppContextProvider
            value={{
              sports,
              user,
              setUser: this.setLoggedInUserHandle,
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
  }
  _loadResourcesAsync = async () => {
    return Font.loadAsync({
      // Roboto: require('native-base/Fonts/Roboto.ttf'),
      // Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      // Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
    });
  };

  _handleLoadingError = (error: Error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

// Create the client as outlined in the setup guide

AppRegistry.registerComponent('MyApplication', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FED2C9",
    // alignItems: 'center', // shit happens if set :(
    justifyContent: 'center',
  },
});
