import React, { useState } from 'react';
import { StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native';

import { IPickerValue } from './Picker/types';
import UPickerGroup from './Picker';
import UPickerPart from './Picker/PickerPart';

enum StateControlType {
  Inner = 'INNER',
  Outer = 'OUTER',
}

interface IProps extends IStyleProps {
  onChange?: (value: number | string) => void;
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

  const handleChange = (newValue: string | number) => {
    if (stateControlType(value) === StateControlType.Inner) {
      setCurrent(Number(newValue));
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <UPickerGroup>
      <UPickerPart
        items={list}
        onChange={handleChange}
        selected={stateControlType(value) === StateControlType.Inner ? current : value}
        style={styles.pickerPart}
        itemStyle={styles.pickerPartItem}
      />
    </UPickerGroup>
  );
}

function stateControlType(value?: number): StateControlType {
  // если value не передается, используется внутренний state
  return value === undefined ? StateControlType.Inner : StateControlType.Outer;
}

const styles = StyleSheet.create({
  pickerPartItem: { color: '#8890A7', fontSize: 16 },
  pickerPart: { flex: 1, marginTop: 15 },
});
