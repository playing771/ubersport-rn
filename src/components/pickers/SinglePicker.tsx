import React, { useState } from 'react';
import { StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native';

import { IPickerValue } from './BasePicker/types';
import UPickerGroup from './BasePicker';
import UPickerPart from './BasePicker/PickerPart';

enum StateControlType {
  Inner = 'INNER',
  Outer = 'OUTER',
}

interface IProps extends IStyleProps {
  onChange?: (value: number, label: string, itemPosition: number) => void;
  value?: number;
  initialValue?: number;
  list: IPickerValue[];
}

interface IStyleProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function SinglePicker({ list, onChange, value, initialValue = 0 }: IProps) {
  const [current, setCurrent] = useState<number>(initialValue);

  const handleChange = (date: number, label: string, itemPosition: number) => {
    if (getStateControlType(value) === StateControlType.Inner) {
      setCurrent(itemPosition);
    }
    if (onChange) {
      onChange(date, label, itemPosition);
    }
  };

  return (
    <UPickerGroup>
      <UPickerPart
        items={list}
        onChange={handleChange}
        value={getStateControlType(value) === StateControlType.Inner ? current : value}
        style={styles.pickerPart}
        itemStyle={styles.pickerPartItem}
      />
    </UPickerGroup>
  );
}

function getStateControlType(value?: number): StateControlType {
  // если value не передается, используется внутренний state
  return value === undefined ? StateControlType.Inner : StateControlType.Outer;
}

const styles = StyleSheet.create({
  pickerPartItem: { color: '#8890A7', fontSize: 16 },
  pickerPart: { flex: 1 },
});
