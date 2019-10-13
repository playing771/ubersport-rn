import React from 'react';
import { Picker, StyleProp, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { IPickerValue } from './types';
import { isIOS } from '../../../utils/deviceInfo';

interface IProps {
  onChange: (itemValue: string, itemPosition: number) => void;
  selected: number;
  items: IPickerValue[];
  measureUnit?: string;
  itemStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

export default function UPickerPart(props: IProps) {
  const { selected, itemStyle, style, items, onChange } = props;

  const innerOnChange = (itemValue: number, itemPosition: number) => {
    // console.log('onchange', itemValue, itemPosition);
    console.log('selected', selected);

    onChange(props.items[itemPosition].label, itemPosition);
  };
  return (
    <Picker
      selectedValue={selected}
      style={style}
      itemStyle={[isIOS && styles.itemIosStyle, itemStyle]}
      onValueChange={innerOnChange}
    >
      {items.map((item, index) => {
        return <Picker.Item label={item.label} value={item.label} key={item.label} />;
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
