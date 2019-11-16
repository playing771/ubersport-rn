import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TabBarIcon from '../components/TabBarIcon';
import ChooseGameTypeScreen from '../screens/EditGame/GameTypeSelect';
import EditGameScreen from '../screens/EditGame/index';
import EditLocationScreen from '../screens/EditGame/Location/index';
// import SingInScreen from '../screens/SignInScreen/index';
// import TestHookScreen from '../screens/TestHookScreen/index';
import EditProfileScreen from '../screens/EditProfile/index';
import FindGameScreen from '../screens/FindGame';
import findGameBottomNav from '../screens/FindGame/bottomTabNav';
import FindOwnLocationScreen from '../screens/FindGame/Location';
import SportFilters from '../screens/FindGame/SportFilters/index';
import GameInfoScreen from '../screens/GameInfo/index';
import NotAuthorizedScreen from '../screens/NotAuthorized';
import ParticipantsScreen from '../screens/Participants/index';
import MyProfileScreen from '../screens/Profile/MyProfile';
import UserInfoScreen from '../screens/Profile/UserInfo';
import { NavigationRoot } from './roots';

const ProfileStack = createStackNavigator({
  [NavigationRoot.Profile]: MyProfileScreen,
  // [NavigationRoot.Profile]: SingInScreen,
  // [NavigationRoot.Profile]: TestHookScreen,
  [NavigationRoot.GameInfo]: GameInfoScreen,
  [NavigationRoot.EditGame]: EditGameScreen,
  [NavigationRoot.EditLocation]: EditLocationScreen,
  [NavigationRoot.EditProfile]: EditProfileScreen,
  [NavigationRoot.NotAuthorized]: NotAuthorizedScreen,
});

const FindGameStack = createStackNavigator({
  [NavigationRoot.FindGame]: FindGameScreen,
  [NavigationRoot.SportFilters]: SportFilters,
  [NavigationRoot.GameInfo]: GameInfoScreen,
  [NavigationRoot.Participants]: ParticipantsScreen,
  [NavigationRoot.Location]: FindOwnLocationScreen,
  [NavigationRoot.UserInfo]: UserInfoScreen,
});

const NewGameStack = createStackNavigator({
  [NavigationRoot.ChooseGameType]: ChooseGameTypeScreen,
  [NavigationRoot.EditGame]: EditGameScreen,
  [NavigationRoot.EditLocation]: EditLocationScreen,
});

FindGameStack.navigationOptions = findGameBottomNav;

export interface IFocused {
  focused: boolean;
}

ProfileStack.navigationOptions = {
  tabBarIcon: ({ focused }: IFocused) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-person` : 'md-information-circle'}
    />
  ),
};

NewGameStack.navigationOptions = {
  tabBarIcon: ({ focused }: IFocused) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-add-circle-outline` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator(
  { NewGameStack, FindGameStack, ProfileStack },
  {
    tabBarOptions: {
      style: {
        height: 45,
      },
      showLabel: false,
      // inactiveBackgroundColor: '#102044',
      // activeBackgroundColor: '#102044'
    },
  }
);
