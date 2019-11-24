import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Colors, { HEADER_BACKGROUND } from '../constants/Colors';
import * as options from '../screens/bottomNavOptions';
import EditGameScreen from '../screens/EditGame';
import ChooseGameTypeScreen from '../screens/EditGame/GameTypeSelect';
import EditLocationScreen from '../screens/EditGame/Location';
// import SingInScreen from '../screens/SignInScreen/index';
import EditProfileScreen from '../screens/EditProfile';
import FindGameScreen from '../screens/FindGame';
// import findGameBottomNav from '../screens/FindGame/bottomNavOptions';
import FindOwnLocationScreen from '../screens/FindGame/Location';
import SportFilters from '../screens/FindGame/SportFilters';
import GameInfoScreen from '../screens/GameInfo';
import NotAuthorizedScreen from '../screens/NotAuthorized';
import ParticipantsScreen from '../screens/Participants';
import MyProfileScreen from '../screens/Profile/MyProfile';
import UserInfoScreen from '../screens/Profile/UserInfo';
import { NavigationRoot } from './roots';

const ProfileStack = createStackNavigator({
  [NavigationRoot.Profile]: MyProfileScreen,
  // [NavigationRoot.Profile]: SingInScreen,
  // [NavigationRoot.Profile]: TestHookScreen,
  [NavigationRoot.GameInfo]: GameInfoScreen,
  [NavigationRoot.EditGame]: EditGameScreen,
  [NavigationRoot.FindGame]: FindGameScreen,
  // [NavigationRoot.UserInfo]: UserInfoScreen,
  [NavigationRoot.Participants]: ParticipantsScreen,
  [NavigationRoot.EditLocation]: EditLocationScreen,
  [NavigationRoot.EditProfile]: EditProfileScreen,
  [NavigationRoot.NotAuthorized]: NotAuthorizedScreen,
});

const FindGameStack = createStackNavigator({
  [NavigationRoot.FindGame]: FindGameScreen,
  [NavigationRoot.SportFilters]: SportFilters,
  [NavigationRoot.GameInfo]: GameInfoScreen,
  [NavigationRoot.EditGame]: EditGameScreen,
  [NavigationRoot.Participants]: ParticipantsScreen,
  [NavigationRoot.Location]: FindOwnLocationScreen,
  [NavigationRoot.UserInfo]: UserInfoScreen,
  [NavigationRoot.NotAuthorized]: NotAuthorizedScreen,
});

const NewGameStack = createStackNavigator({
  [NavigationRoot.ChooseGameType]: ChooseGameTypeScreen,
  [NavigationRoot.EditGame]: EditGameScreen,
  [NavigationRoot.GameInfo]: GameInfoScreen,
  [NavigationRoot.EditLocation]: EditLocationScreen,
  [NavigationRoot.NotAuthorized]: NotAuthorizedScreen,
});

FindGameStack.navigationOptions = options.FindGamebottomNavOptions;
ProfileStack.navigationOptions = options.ProfileBottomNavOptions;
NewGameStack.navigationOptions = options.NewGameBottomNavOptions;

export default createBottomTabNavigator(
  { FindGameStack, NewGameStack, ProfileStack },
  {
    tabBarOptions: {
      // tabStyle: { backgroundColor: Colors.tintColor },
      activeTintColor: Colors.active,
      inactiveTintColor: HEADER_BACKGROUND,

      allowFontScaling: true,
      style: {
        // height: 45,
        // backgroundColor: HEADER_BACKGROUND,
        paddingTop: 6,
        paddingBottom: 6,
      },
      // showLabel: true,
      // inactiveBackgroundColor: '#102044',
      // activeBackgroundColor: '#102044',
    },
  }
);
