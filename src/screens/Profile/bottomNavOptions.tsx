import React from 'react';
import { NavigationBottomTabOptions } from 'react-navigation-tabs';
import { TabBarTitle } from '../../components/TabBarTitle';
import Colors from '../../constants/Colors';
import useAppContext from '../../hooks/useAppContext';
import ProfileAvatar from '../EditProfile/AvatarSelect/ProfileAvatar';

interface IProps {
  focused: boolean;
}

export const ProfileBottomNavOptions: NavigationBottomTabOptions = {
  tabBarLabel: ({ focused }: IProps) => <TabBarTitle focused={focused} title="Профиль" />,
  tabBarIcon: ({ focused }) => <TabBarProfileIcon focused={focused} />,
};

function TabBarProfileIcon({ focused }: IProps) {
  const {
    user: { avatar },
  } = useAppContext();
  return (
    <ProfileAvatar
      borderStyle={{ borderColor: Colors.tabNavActive }}
      withBorder={focused}
      size={focused ? 28 : 24}
      avatarSrc={avatar}
    />
  );
}
