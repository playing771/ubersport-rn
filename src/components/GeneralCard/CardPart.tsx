import * as React from "react";
import { GestureResponderEvent } from "react-native";
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity
} from "react-native";

const defaultProps = {
  bordered: true,
  padded: true
};

type Props = {
  // children: (api: API) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: (e: GestureResponderEvent) => void;
} & typeof defaultProps;

const CardPart: React.FC<Props> = ({
  children,
  bordered,
  style,
  padded,
  onPress
}) => {
  const _styles = _getStyles(padded);
  const isDisabled = typeof onPress === "undefined";
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[
        _styles.mainContainer,
        bordered ? _styles.border : undefined,
        style
      ]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const _getStyles = (padded: boolean) => {
  const styles = StyleSheet.create({
    mainContainer: {
      paddingHorizontal: padded ? 15 : 0,
      paddingVertical: padded ? 10 : 0
    },
    border: {
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: "#F0F0F0"
    }
  });
  return styles;
};

CardPart.defaultProps = defaultProps;

type OuterProps = Pick<Props, Exclude<keyof Props, keyof typeof defaultProps>> &
  Partial<typeof defaultProps>;

export default CardPart as React.FC<OuterProps>;
