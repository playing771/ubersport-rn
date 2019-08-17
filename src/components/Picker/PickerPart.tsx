import * as React from 'react';
import {
  PickerIOS,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextStyle
} from 'react-native';
import { IPickerValue } from './types';

const defaultProps = {};

interface IProps {
  onChange: (value: string | number) => void;
  selected: number | number;
  items: IPickerValue[];
  measureUnit?: string;
  itemStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

class UPickerPart extends React.Component<IProps> {
  static defaultProps = defaultProps;

  render() {
    const { selected, itemStyle, style, items, onChange } = this.props;
    return (
      <PickerIOS
        selectedValue={selected}
        style={[styles.container, style]}
        itemStyle={[styles.itemStyle, itemStyle]}
        onValueChange={onChange}
      >
        {items.map((item, index) => (
          <PickerIOS.Item label={item.label} value={item.value} key={index} />
        ))}
      </PickerIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  itemStyle: {
    margin: 0,
    // paddingHorizontal: 22,
    height: 100
  }
});

export default UPickerPart;
