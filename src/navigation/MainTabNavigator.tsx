import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TabBarIcon from '../components/TabBarIcon';
import EditGameScreen from '../screens/EditGame';
import ChooseGameTypeScreen from '../screens/EditGame/GameTypeSelect';
import EditLocationScreen from '../screens/EditGame/Location';
// import SingInScreen from '../screens/SignInScreen/index';
// import TestHookScreen from '../screens/TestHookScreen/index';
import EditProfileScreen from '../screens/EditProfile';
import FindGameScreen from '../screens/FindGame';
import findGameBottomNav from '../screens/FindGame/bottomTabNav';
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
});

const NewGameStack = createStackNavigator({
  [NavigationRoot.ChooseGameType]: ChooseGameTypeScreen,
  [NavigationRoot.EditGame]: EditGameScreen,
  [NavigationRoot.GameInfo]: GameInfoScreen,
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
