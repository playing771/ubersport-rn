import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import sharedStyles from './sharedStyles';

export const defaultHeaderOptions = {
  headerTitleStyle: sharedStyles.headerTitleStyle,
  headerStyle: sharedStyles.header,
  headerBackTitleStyle: sharedStyles.headerBackTitleStyle,
  headerBackImage: () => (
    <Ionicons name="ios-arrow-back" color="white" size={28} style={sharedStyles.headerBackIcon} />
  ),
};
