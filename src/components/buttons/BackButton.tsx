import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ViewStyle } from 'react-native';
import withTouch from '../hocs/WIthTouch';

interface IProps {
  style?: ViewStyle;
}

function BackButton({ style }: IProps) {
  return <Ionicons name="ios-arrow-back" color="white" size={32} style={style} />;
}

export default withTouch(BackButton);
