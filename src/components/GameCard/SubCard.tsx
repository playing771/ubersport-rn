import * as React from "react";
import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  textColor: string;
  icon: string;
  mainText: string;
  subText: string;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
};

const SubCard: React.SFC<Props> = props => {
  const _styles = _getStyles(props.textColor);
  return (
    <View style={[_styles.mainContainer, props.style]}>
      <Ionicons
        name={props.icon}
        size={28}
        color={props.iconColor}
        style={_styles.icon}
        // style={s.cardImage}
        // color={this.getTextIconColor(sport.name)}
      />
      <View style={_styles.textContainer}>
        <Text numberOfLines={1} style={_styles.mainText}>
          {props.mainText}
        </Text>
        <Text numberOfLines={1} style={_styles.mainText}>
          {props.subText}
        </Text>
      </View>
    </View>
  );
};

const _getStyles = (textColor: string) => {
  const _styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 12,
      flexDirection: "row"
    },
    textContainer: {
      alignItems: "flex-start",
      justifyContent: "center",
      paddingLeft: 12
    },
    icon: {
      alignSelf: "center"
    },
    mainText: {
      color: textColor,
      fontWeight: "500",
      fontSize: 10,
      flex: 1
      // fontFamily: "Avenir"
    }
  });
  return _styles;
};

export default SubCard;
