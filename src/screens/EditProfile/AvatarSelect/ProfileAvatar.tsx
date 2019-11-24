import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import UserAvatar from '../../../components/AvatarsGroup/UserAvatar';

interface IProps {
  avatarSrc?: string | null;
  style?: ViewStyle;
  size?: number;
  withBorder?: boolean;
  borderStyle?: ViewStyle;
}

const PICTURE_SIZE = 150;
const NOAVATAR_PICTURE_SIZE_RATIO = 1.2;

export default function ProfileAvatar({ avatarSrc, style, size, withBorder, borderStyle }: IProps) {
  // const styles = getStyle(size);
  return (
    <View style={style}>
      <UserAvatar
        src={avatarSrc}
        size={size ? size : PICTURE_SIZE}
        style={withBorder ? [styles.bordered, borderStyle] : styles.borderLess}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // avatarContainer: {
  //   backgroundColor: '#D2D5DB',
  //   width: size ? size : PICTURE_SIZE,
  //   height: size ? size : PICTURE_SIZE,
  //   borderRadius: size ? size : PICTURE_SIZE,
  //   overflow: 'hidden',
  // },
  // avatarIcon: { alignSelf: 'center' },
  borderLess: { borderWidth: 0 },
  bordered: { borderWidth: 1 },
});
