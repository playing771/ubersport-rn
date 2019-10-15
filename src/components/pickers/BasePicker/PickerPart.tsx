import React from 'react';
import { Picker, StyleProp, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { IPickerValue } from './types';
import { isIOS } from '../../../utils/deviceInfo';

interface IProps {
  onChange: (date: number, label: string, itemPosition: number) => void;
  value: number;
  items: IPickerValue[];
  // measureUnit?: string;
  itemStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

export default function UPickerPart(props: IProps) {
  const { value, itemStyle, style, items, onChange } = props;

  const innerOnChange = (date: number, itemPosition: number) => {
    onChange(date, props.items[itemPosition].label, itemPosition);
  };
  return (
    <Picker
      selectedValue={value}
      style={style}
      itemStyle={[isIOS && styles.itemIosStyle, itemStyle]}
      onValueChange={innerOnChange}
    >
      {items.map((item, index) => {
        return <Picker.Item label={item.label} value={item.value} key={index} />;
      })}
    </Picker>
  );
}

const styles = StyleSheet.create({
  itemIosStyle: {
    margin: 0,
    // paddingHorizontal: 22,
    height: 100,
  },
});
