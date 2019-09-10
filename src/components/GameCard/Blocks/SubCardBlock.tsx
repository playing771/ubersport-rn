import React from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IProps {
  textColor: string;
  icon: string;
  mainText: string;
  subText?: string;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
}

const ICON_SIZE = 28;

const SubCardBlock = (props: IProps) => {
  const styles = _getStyles(props.textColor);
  return (
    <View style={[styles.mainContainer, props.style]}>
      <Ionicons
        name={props.icon}
        size={ICON_SIZE}
        color={props.iconColor}
        style={styles.icon}
        // style={s.cardImage}
        // color={this.getTextIconColor(sport.name)}
      />
      <View style={styles.textContainer}>
        <Text
          numberOfLines={props.subText ? 1 : 2}
          style={[styles.mainText, !props.subText && { lineHeight: 14 }]}
        >
          {props.mainText}
        </Text>
        {props.subText && (
          <Text numberOfLines={1} style={styles.mainText}>
            {props.subText}
          </Text>
        )}
      </View>
    </View>
  );
};

const _getStyles = (textColor: string) => {
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 12,
      flexDirection: 'row',
    },
    textContainer: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 12,
    },
    icon: {
      alignSelf: 'center',
    },
    mainText: {
      color: textColor,
      fontWeight: '500',
      fontSize: 10,
      flex: 1,
      // fontFamily: "Avenir"
    },
  });
  return styles;
};

export default SubCardBlock;
