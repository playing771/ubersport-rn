import React, { ReactElement } from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import withToggle, { IWithToggleProps } from '../hocs/WithToggle';

const ICON_SIZE = 26;
interface IProps extends IWithToggleProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<TextStyle>;
  children: ReactElement | ReactElement[] | string;
}

function ToggleableItem(props: IProps) {
  return (
    <View style={[styles.item, props.style]}>
      <Text style={[styles.itemText, props.textStyle, props.active && props.activeTextStyle]}>
        {props.children}
      </Text>
      {props.active && (
        <Ionicons
          name="ios-checkmark-circle-outline"
          size={ICON_SIZE}
          color={Colors.active}
          style={[styles.itemIcon, props.indicatorStyle]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 12
  },
  itemText: {
    color: '#667286',
    fontWeight: '700',
    fontSize: 14,
  },
  itemIcon: {
    marginLeft: 'auto',
  },
  active: {
    color: Colors.active,
  },
});

export default withToggle(ToggleableItem);
