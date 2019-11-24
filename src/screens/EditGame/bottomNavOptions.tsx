import React from 'react';
import { NavigationBottomTabOptions } from 'react-navigation-tabs';
import { TabBarIcon } from '../../components/TabBarIcon';
import { TabBarTitle } from '../../components/TabBarTitle';

export const NewGameBottomNavOptions: NavigationBottomTabOptions = {
  tabBarLabel: ({ focused }: { focused: boolean }) => (
    <TabBarTitle focused={focused} title="Создать" />
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={focused ? 'ios-add-circle' : 'ios-add-circle-outline'} />
  ),
};
