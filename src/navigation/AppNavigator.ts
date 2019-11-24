import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingScreen from '../screens/Loading/index';
import SingInScreen from '../screens/SignInScreen/index';
import MainTabNavigator from './MainTabNavigator';

const AuthStack = createStackNavigator({
  SignIn: SingInScreen,
});

export default createSwitchNavigator({
  LOADING: LoadingScreen,
  MAIN: MainTabNavigator,
  AUTH: AuthStack,
});
