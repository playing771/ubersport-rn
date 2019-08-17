import React from 'react';
import {
  View,
  ActivityIndicator,
  StatusBar,
  Text,
  AsyncStorage
} from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { NavigationRoot } from '../../navigation/roots';
import { StyleSheet } from 'react-native';
import { View as AnimatedView } from 'react-native-animatable';
import withAppContext from '../../components/hocs/WithAppContext';
import { IAppContextInjectedProp } from '../../other/context/sports';

interface IProps extends NavigationInjectedProps, IAppContextInjectedProp {}

interface IState {}

@withAppContext
export default class LoadingScreen extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    // this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    console.log('LOADINg screen');

    // AsyncStorage.clear();

    const user = await AsyncStorage.getItem('user');
    console.log('user', user);

    // AsyncStorage.clear();
    if (user) {
      this.props.ctx.setUser(JSON.parse(user));
    }
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(
      // userToken ? NavigationRoot.Main : NavigationRoot.Auth
      // NavigationRoot.FindGame
      NavigationRoot.Profile
    );
  };

  componentDidMount() {
    setTimeout(() => {
      this._bootstrapAsync();
    }, 800);
  }

  public render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content" />
        <AnimatedView
          style={styles.contentContainer}
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          useNativeDriver={true}
          duration={2000}
        >
          <Text style={styles.title}>Загрузка</Text>
          <ActivityIndicator size="small" color="white" style={styles.loader} />
        </AnimatedView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#101F44',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: { flexDirection: 'row', alignItems: 'center' },
  title: { color: 'white', fontSize: 18 },
  loader: { marginLeft: 12 }
});
