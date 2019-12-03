import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import getSportIcon from '../../constants/getSportIcon';

interface IProps {
  sportId: number;
  style?: StyleProp<ViewStyle>;
}

export function SportIcon({ sportId, style }: IProps) {
  return <Ionicons name={getSportIcon(sportId)} size={35} color={'#3B485A'} style={style} />;
}
