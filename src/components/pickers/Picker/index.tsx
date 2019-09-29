import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import UPickerPart from './PickerPart';

const defaultProps = {
  valueSelector: true,
};

interface IProps {
  style?: StyleProp<ViewStyle>;
  // onChange: (value: number) => void;
  valueSelector: boolean;
}

class UPickerGroup extends React.Component<IProps> {
  static defaultProps = defaultProps;
  static Part = UPickerPart; // TODO: увязать вместе с defaultProps

  public render() {
    return <View style={[styles.container, this.props.style]}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
});

export default UPickerGroup;
