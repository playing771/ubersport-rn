import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import getSportIcon from '../../constants/getSportIcon';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';

interface IProps {
  sport: string;
  style?: StyleProp<ViewStyle>;
}

const SportIcon = ({ sport, style }: IProps) => {
  return (
    <Ionicons
      name={getSportIcon(sport)}
      size={35}
      color={'#3B485A'}
      style={[styles.main, style]}
    />
  );
};

const styles = StyleSheet.create({
  main: {}
});

export default SportIcon;
