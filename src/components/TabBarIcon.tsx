import React from 'react';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface ITabBarIconProps {
  name: string;
  focused: boolean;
}

const TabBarIcon: React.SFC<ITabBarIconProps> = props => {
  return (
    <Ionicons
      name={props.name}
      size={28}
      // style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
};

export default TabBarIcon;
