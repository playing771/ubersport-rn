import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import withToggle, { IWithToggleProps } from '../hocs/WithToggle';

interface IProps extends IWithToggleProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<TextStyle>;
}

const ToggleableItem: React.FC<IProps> = props => {
  return (
    <View style={[styles.item, props.style]}>
      <Text style={[styles.itemText, props.textStyle, props.activeTextStyle]}>
        {props.children}
      </Text>
      {props.active && (
        <Ionicons
          name="ios-checkmark-circle-outline"
          size={26}
          color={Colors.active}
          style={[styles.itemIcon, props.indicatorStyle]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center'
    // paddingVertical: 12
  },
  itemText: {
    color: '#667286',
    fontWeight: '700',
    fontSize: 14
  },
  itemIcon: {
    marginLeft: 'auto'
  },
  active: {
    color: Colors.active
  }
});

export default withToggle(ToggleableItem);
