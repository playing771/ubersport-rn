import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import FindGameScreen from '../screens/FindGame';
import findGameBottomNav from '../screens/FindGame/bottomTabNav';
import MyProfileScreen from '../screens/Profile/MyProfile';
import { NavigationRoot } from './roots';
import ChooseGameTypeScreen from '../screens/ChooseGameType/index';
import EditGameScreen from '../screens/EditGame/index';
import SportFilters from '../screens/SportFilters/index';
import GameInfoScreen from '../screens/GameInfo/index';
import EditLocationScreen from '../screens/EditGame/Location/index';
import ParticipantsScreen from '../screens/Participants/index';
import UserInfoScreen from '../screens/Profile/UserInfo';
// import SingInScreen from '../screens/SignInScreen/index';
// import TestHookScreen from '../screens/TestHookScreen/index';
import EditProfileScreen from '../screens/EditProfile/index';
import NotAuthorizedScreen from '../screens/NotAuthorized';

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
  // [NavigationRoot.Location]: GameLocationScreen,
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
