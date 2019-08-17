import React, { ReactChild } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// по умолченаю иконки берутся из ionicicons

type IIConPosition = 'TOP' | 'BOTTOM' | 'CENTER';

interface IProps extends IStyleProps {
  icon: string | JSX.Element;
  label?: string | (() => JSX.Element);
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
  iconParams: { color: '#B1B2B4', size: 20, iconPosition: 'TOP' }
};

class UbSectionItem extends React.Component<IProps> {
  static defaultProps = defaultProps;

  render() {
    return (
      <View style={[styles.inputContainer, this.props.style]}>
        <View
          style={{
            ...styles.iconContainer,
            ...getIconPositionStyle(this.props.iconPosition)
          }}
        >
          <IconItem icon={this.props.icon} iconParams={this.props.iconParams} />
        </View>
        <View style={getLabelStyles(this.props.bordered)}>
          {typeof this.props.label !== 'undefined' && (
            <LabelItem
              label={this.props.label}
              labelStyle={this.props.labelStyle}
            />
          )}
        </View>
        {this.props.side && (
          <View style={[styles.sideContainer, this.props.sideStyle]}>
            {this.props.side}
          </View>
        )}
      </View>
    );
  }
}

const LabelItem = ({
  label,
  labelStyle
}: {
  label: string | (() => JSX.Element);
  labelStyle?: StyleProp<TextStyle>;
}) => {
  return isStringLabel(label) ? (
    <Text style={[styles.label, labelStyle]}>{label}</Text>
  ) : (
    label()
  );
};

const IconItem = ({
  icon,
  iconParams
}: {
  icon: string | JSX.Element;
  iconParams?: { color: string; size: number };
}) => {
  return isStringIcon(icon) ? <Ionicons name={icon} {...iconParams} /> : icon;
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row'
  },
  iconContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16
    // paddingBottom: 25
  },
  labelContaiener: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 2
  },
  sideContainer: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16
  },
  withBorder: { borderBottomWidth: 1, borderColor: '#E5E5E7' },
  label: {
    color: '#00BBBB',
    fontWeight: '400'
    // fontSize: 14
  }
  //  4CA7FF
});

function getLabelStyles(bordered?: boolean) {
  return Object.assign(
    {},
    styles.labelContaiener,
    bordered ? styles.withBorder : undefined
  );
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

export default UbSectionItem;
