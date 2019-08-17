import * as React from "react";
import {
  View,
  Image,
  ViewStyle,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  StyleProp
} from "react-native";

type UserAvatarProps = {
  src?: string;
  style?: StyleProp<ViewStyle>;
  count?: number;
} & typeof defaultProps;

const defaultProps = {
  size: 30,
  counterColor: "transparent",
  imageBorderWidthRatio: 0.9
};

const UserAvatar: React.SFC<UserAvatarProps> = ({
  size,
  src,
  style,
  count,
  counterColor,
  imageBorderWidthRatio
}) => {
  const s = getStyle(size, counterColor, imageBorderWidthRatio);
  return (
    <View style={[s.imageContainer, style]}>
      {src ? (
        <Image
          borderRadius={(size * 0.9) / 2}
          style={s.image}
          source={{
            uri: src
          }}
        />
      ) : (
        <View style={s.counterContainer}>
          {count && <Text style={s.counter}>+{count}</Text>}
        </View>
      )}
    </View>
  );
};

const getStyle = (
  size: number,
  counterColor: string,
  imageBorderWidthRatio: number
) => {
  // console.log("size", size);
  return StyleSheet.create<Style>({
    imageContainer: {
      width: size,
      height: size,
      borderRadius: size! / 2,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center"
    },
    counterContainer: {
      borderRadius: (size * 0.9) / 2,
      width: size * 0.9,
      height: size * 0.9,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: counterColor
    },
    image: {
      width: size * imageBorderWidthRatio,
      height: size * imageBorderWidthRatio
    },
    counter: { color: "#76706f", fontWeight: "600", fontSize: 12 }
  });
};

interface Style {
  imageContainer: ViewStyle;
  counterContainer: ViewStyle;
  image: ImageStyle;
  counter: TextStyle;
}

UserAvatar.defaultProps = defaultProps;

type OuterProps = Pick<
  UserAvatarProps,
  Exclude<keyof UserAvatarProps, keyof typeof defaultProps>
> &
  Partial<typeof defaultProps>;

export default UserAvatar as React.SFC<OuterProps>;
