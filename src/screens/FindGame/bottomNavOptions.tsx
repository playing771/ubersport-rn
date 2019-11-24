import React from 'react';
import { Platform } from 'react-native';
import { NavigationBottomTabOptions } from 'react-navigation-tabs';
import { TabBarIcon } from '../../components/TabBarIcon';
import { TabBarTitle } from '../../components/TabBarTitle';

export const FindGamebottomNavOptions: NavigationBottomTabOptions = {
  tabBarLabel: ({ focused }: { focused: boolean }) => (
    <TabBarTitle focused={focused} title="Поиск" />
  ),
  tabBarIcon: ({ focused }) => {
    return (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? // ? `ios-link${focused ? '' : '-outline'}`
              `ios-search`
            : 'md-search'
        }
      />
    );
  },
};
