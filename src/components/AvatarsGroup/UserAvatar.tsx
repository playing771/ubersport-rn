import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { FILES_URL } from '../../constants/Api';
import Colors from '../../constants/Colors';
import UImage from '../UImage';
import ULoader from '../ULoader';
import EmptyAvatar from './EmptyAvatar';

type UserAvatarProps = {
  src: string | undefined | null;
  style?: StyleProp<ViewStyle>;
  count?: number;
} & typeof defaultProps;

const defaultProps = {
  size: 30,
  counterColor: 'transparent',
  imageBorderWidthRatio: 0.9,
};

const UserAvatar: React.SFC<UserAvatarProps> = ({
  size,
  src,
  style,
  count,
  counterColor,
  imageBorderWidthRatio,
}) => {
  const s = getStyle(size, counterColor, imageBorderWidthRatio);

  return (
    <View style={[s.imageContainer, style]}>
      {src ? (
        <UImage
          indicator={() => <ULoader color="#434E77" />}
          borderRadius={(size * 0.9) / 2}
          style={s.image}
          source={{
            uri: /^http/.test(src) ? src : `${FILES_URL}/${src}`,
          }}
        />
      ) : !count ? (
        <EmptyAvatar size={size} />
      ) : (
        <View style={s.counterContainer}>{count && <Text style={s.counter}>+{count}</Text>}</View>
      )}
    </View>
  );
};

const getStyle = (size: number, counterColor: string, imageBorderWidthRatio: number) => {
  // console.log("size", size);
  return StyleSheet.create({
    imageContainer: {
      width: size,
      height: size,
      borderRadius: size! / 2,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },

    counterContainer: {
      borderRadius: (size * 0.9) / 2,
      width: size * 0.9,
      height: size * 0.9,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.purle,
    },
    image: {
      width: size * imageBorderWidthRatio,
      height: size * imageBorderWidthRatio,
    },
    counter: { color: 'white', fontWeight: '600', fontSize: 12 },
  });
};

// interface Style {
//   imageContainer: ViewStyle;
//   counterContainer: ViewStyle;
//   image: ImageStyle;
//   counter: TextStyle;
// }

UserAvatar.defaultProps = defaultProps;

type OuterProps = Pick<UserAvatarProps, Exclude<keyof UserAvatarProps, keyof typeof defaultProps>> &
  Partial<typeof defaultProps>;

export default UserAvatar as React.SFC<OuterProps>;
