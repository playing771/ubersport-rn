import * as React from 'react';
import { IFocused } from '../../navigation/MainTabNavigator';
import TabBarIcon from '../../components/TabBarIcon';
import { Platform } from 'react-native';

const findGameBottomNav = {
  tabBarLabel: ' ',
  tabBarShowLabels: 'hidden',
  tabBarIcon: ({ focused }: IFocused) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? // ? `ios-link${focused ? '' : '-outline'}`
            `ios-search`
          : 'md-search'
      }
    />
  )
};

export default findGameBottomNav;
