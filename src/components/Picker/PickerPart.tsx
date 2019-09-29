import React from 'react';
import { Picker, StyleProp, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { IPickerValue } from './types';
import { isIOS } from '../../utils/deviceInfo';

interface IProps {
  onChange: (value: string | number) => void;
  selected: number | number;
  items: IPickerValue[];
  measureUnit?: string;
  itemStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

function UPickerPart(props: IProps) {
  const { selected, itemStyle, style, items, onChange } = props;
  return (
    <Picker
      selectedValue={selected}
      style={style}
      itemStyle={[isIOS && styles.itemIosStyle, itemStyle]}
      onValueChange={onChange}
    >
      {items.map((item, index) => (
        <Picker.Item label={item.label} value={item.value} key={index} />
      ))}
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

export default UPickerPart;
