import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import UserAvatar from '../../../components/AvatarsGroup/UserAvatar';
import { Ionicons } from '@expo/vector-icons';

interface IProps {
  avatarSrc?: string;
  style?: ViewStyle;
  size?: number;
}

const PICTURE_SIZE = 150;
const NOAVATAR_PICTURE_SIZE_RATIO = 1.2;

export default function ProfileAvatar({ avatarSrc, style, size }: IProps) {
  const styles = getStyle(size);
  return (
    <View style={style}>
      {avatarSrc !== undefined ? (
        <UserAvatar
          src={avatarSrc}
          size={size ? size : PICTURE_SIZE}
          style={{ borderWidth: 0 }}
        />
      ) : (
        <View style={styles.avatarContainer}>
          <Ionicons
            size={
              size
                ? size * NOAVATAR_PICTURE_SIZE_RATIO
                : PICTURE_SIZE * NOAVATAR_PICTURE_SIZE_RATIO
            }
            name="ios-person"
            color="white"
            style={styles.avatarIcon}
          />
        </View>
      )}
    </View>
  );
}

function getStyle(size?: number) {
  const styles = StyleSheet.create({
    avatarContainer: {
      backgroundColor: '#D2D5DB',
      width: size ? size : PICTURE_SIZE,
      height: size ? size : PICTURE_SIZE,
      borderRadius: size ? size : PICTURE_SIZE,
      overflow: 'hidden'
    },
    avatarIcon: { alignSelf: 'center' }
  });
  return styles;
}
