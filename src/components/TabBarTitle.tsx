import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';

interface IProps {
  title: string;
  focused: boolean;
}

export function TabBarTitle({ title, focused }: IProps) {
  return <Text style={[styles.text, focused ? styles.active : styles.default]}>{title}</Text>;
}

const styles = StyleSheet.create({
  text: { textAlign: 'center', fontSize: 10 },
  active: { color: Colors.tabNavActive, fontSize: 12 },
  default: { color: Colors.tabNav },
});
