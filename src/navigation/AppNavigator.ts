import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoadingScreen from '../screens/Loading/index';
import { createStackNavigator } from 'react-navigation';
import SingInScreen from '../screens/SignInScreen/index';
import NotAuthorizedScreen from '../screens/NotAuthorized';

const AuthStack = createStackNavigator({
  SignIn: SingInScreen
});

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  LOADING: LoadingScreen,
  MAIN: MainTabNavigator,
  AUTH: AuthStack
});
