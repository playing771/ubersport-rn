import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import Colors from '../constants/Colors';

interface IProps {
  name: string;
  focused: boolean;
}

export function TabBarIcon({ name, focused }: IProps) {
  return (
    <Ionicons
      name={name}
      size={focused ? 28 : 24}
      // style={{ marginBottom: -3 }}
      color={focused ? Colors.tabNavActive : Colors.tabNav}
      // style={{ fontSize: 24 }}
    />
  );
}
