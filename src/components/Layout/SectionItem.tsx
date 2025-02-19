import { Ionicons } from '@expo/vector-icons';
import React, { ReactChild, ReactElement } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// по умолченаю иконки берутся из ionicicons

type IIConPosition = 'TOP' | 'BOTTOM' | 'CENTER';

interface IProps extends IStyleProps {
  icon: string | JSX.Element;
  label?: string | ReactElement;
  side?: ReactChild;
  onPress?: (data?: any) => void;
}
interface IStyleProps {
  style?: StyleProp<ViewStyle>;
  iconParams?: { color: string; size: number };
  labelStyle?: StyleProp<TextStyle>;
  sideStyle?: StyleProp<ViewStyle>;
  bordered?: boolean;
  iconPosition?: IIConPosition;
}

const defaultProps = {
  iconParams: { color: '#B1B2B4', size: 20, iconPosition: 'TOP' },
};

export default function UbSectionItem(props: IProps) {
  function renderLabelItem() {
    if (props.onPress && props.label) {
      return (
        <TouchableOpacity onPress={props.onPress}>
          <LabelItem label={props.label} labelStyle={props.labelStyle} />
        </TouchableOpacity>
      );
    }
    return !!props.label ? <LabelItem label={props.label} labelStyle={props.labelStyle} /> : null;
  }

  return (
    <View style={[styles.inputContainer, props.style]}>
      <View
        style={{
          ...styles.iconContainer,
          ...getIconPositionStyle(props.iconPosition),
        }}
      >
        <IconItem icon={props.icon} iconParams={props.iconParams} />
      </View>
      <View style={getLabelStyles(props.bordered)}>{renderLabelItem()}</View>
      {props.side && <View style={[styles.sideContainer, props.sideStyle]}>{props.side}</View>}
    </View>
  );
}

UbSectionItem.defaultProps = defaultProps;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 13,
    // paddingBottom: 25
  },
  labelContaiener: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 0,
  },
  sideContainer: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  withBorder: { borderBottomWidth: 1, borderColor: '#E5E5E7' },
  label: {
    color: '#00BBBB',
    fontWeight: '400',
    // fontSize: 14
  },
  //  4CA7FF
});

function LabelItem({
  label,
  labelStyle,
}: {
  label: string | ReactElement;
  labelStyle?: StyleProp<TextStyle>;
}) {
  return isStringLabel(label) ? <Text style={[styles.label, labelStyle]}>{label}</Text> : label;
}

function IconItem({
  icon,
  iconParams,
}: {
  icon: string | JSX.Element;
  iconParams?: { color: string; size: number };
}) {
  return isStringIcon(icon) ? <Ionicons name={icon} {...iconParams} /> : icon;
}

function getLabelStyles(bordered?: boolean) {
  return Object.assign({}, styles.labelContaiener, bordered ? styles.withBorder : undefined);
}

function isStringLabel(label: (() => JSX.Element) | string): label is string {
  return typeof (label as string).fontcolor !== 'undefined';
}

function isStringIcon(icon: JSX.Element | string): icon is string {
  return typeof (icon as string).fontcolor !== 'undefined';
}

function getIconPositionStyle(position?: IIConPosition): ViewStyle {
  switch (position) {
    case 'TOP':
      return { justifyContent: 'flex-start' };
    case 'BOTTOM':
      return { justifyContent: 'flex-end' };
    case 'CENTER':
      return { justifyContent: 'center' };
    default:
      return { justifyContent: 'flex-start' };
  }
}
