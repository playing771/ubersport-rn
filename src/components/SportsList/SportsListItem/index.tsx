import React, { ReactElement } from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import withToggle, { IWithToggleProps } from '../../hocs/WithToggle';
import withTouch from '../../hocs/WIthTouch';

const ICON_SIZE = 26;

interface ISimpleItemProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: ReactElement | ReactElement[] | string;
  icon?: ReactElement;
}

interface IToggleableItemProps extends ISimpleItemProps, IWithToggleProps {
  indicatorStyle?: StyleProp<TextStyle>;
}

function SporstListItemInner(props: ISimpleItemProps) {
  return (
    <View style={[styles.item, props.style]}>
      <Text style={[styles.itemText, props.textStyle]}>{props.children}</Text>
      {props.icon}
    </View>
  );
}

// простой кликабельнй элемент списка видов спрорта
export const SporstListItem = withTouch(SporstListItemInner);

// toggleable элемент списка с икокной (checkmark)
const ToggleableSportsListItem = withToggle(
  ({ children, active, textStyle, activeTextStyle, ...props }: IToggleableItemProps) => {
    return (
      <SporstListItemInner
        {...props}
        textStyle={[textStyle, active && activeTextStyle]}
        icon={
          active && (
            <Ionicons
              name="ios-checkmark-circle-outline"
              size={ICON_SIZE}
              color={Colors.active}
              style={[styles.itemIcon, props.indicatorStyle]}
            />
          )
        }
      >
        {children}
      </SporstListItemInner>
    );
  }
);

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

export default ToggleableSportsListItem;
