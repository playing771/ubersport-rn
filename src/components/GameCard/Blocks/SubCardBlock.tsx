import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

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
  return (
    <View style={[styles.mainContainer, props.style]}>
      <Ionicons name={props.icon} size={ICON_SIZE} color={props.iconColor} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text
          numberOfLines={props.subText ? 1 : 2}
          style={[styles.mainText, { color: props.textColor }]}
        >
          {props.mainText}
        </Text>
        {props.subText && (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.mainText, { color: props.textColor }]}
          >
            {props.subText}
          </Text>
        )}
      </View>
    </View>
  );
};

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
    // color: textColor,
    fontWeight: '500',
    fontSize: 10,

    // fontFamily: "Avenir"
    textAlignVertical: 'center',
  },
});

export default SubCardBlock;
