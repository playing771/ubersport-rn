import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IProps {
  size?: number;
}

const PICTURE_SIZE = 150;
const NOAVATAR_PICTURE_SIZE_RATIO = 1.2;

export default function EmptyAvatar({ size }: IProps) {
  return (
    <View style={getStyles(size).avatarContainer}>
      <Ionicons
        size={
          size ? size * NOAVATAR_PICTURE_SIZE_RATIO : PICTURE_SIZE * NOAVATAR_PICTURE_SIZE_RATIO
        }
        name="ios-person"
        color="white"
        style={getStyles(size).avatarIcon}
      />
    </View>
  );
}

function getStyles(size?: number) {
  const styles = StyleSheet.create({
    avatarContainer: {
      backgroundColor: '#D2D5DB',
      width: size ? size : PICTURE_SIZE,
      height: size ? size : PICTURE_SIZE,
      borderRadius: size ? size : PICTURE_SIZE,
      overflow: 'hidden',
    },
    avatarIcon: { alignSelf: 'center' },
  });
  return styles;
}
