import React, { useState } from 'react';
import { StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import UPickerGroup from '../../../components/Picker';
import PickerPart from '../../../components/Picker/PickerPart';
import { IPickerValue } from '../../../components/Picker/types';

interface IProps extends IStyleProps {
  onChange: (value: number | string) => void;
  value: number;
  list: IPickerValue[];
}

interface IStyleProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function GameDateInput({ list, onChange, value }: IProps) {
  const [current, setCurrent] = useState(0);

  return (
    <UPickerGroup>
      <PickerPart
        items={list}
        onChange={onChange}
        selected={value}
        style={styles.pickerPart}
        itemStyle={styles.pickerPartItem}
      />
    </UPickerGroup>
  );
}

const styles = StyleSheet.create({
  pickerPartItem: { color: '#8890A7', fontSize: 16 },
  pickerPart: { flex: 1, marginTop: 15 },
});
