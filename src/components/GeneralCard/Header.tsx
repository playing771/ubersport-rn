import * as React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface Props {
  bgColor?: string;
}

interface Style {
  container: ViewStyle;
  // text: TextStyle;
  // closeButton: ViewStyle;
  // closeText: TextStyle;
}

const CardHeader: React.SFC<Props> = props => {
  const s = _getStyles(props.bgColor);
  return <View style={[s.container]}>{props.children}</View>;
};

const _getStyles = (backgroundColor?: string) => {
  return StyleSheet.create<Style>({
    container: {
      borderBottomColor: "#e5eaf2",
      borderBottomWidth: 0.5,
      padding: 10,
      backgroundColor
    }
  });
};

export default CardHeader;
