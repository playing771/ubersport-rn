import React from 'react';
import { StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import UPickerGroup from '../BasePicker';
import PickerPart from '../BasePicker/PickerPart';
import { TimePickerUtils } from '../TimePicker/utils';

interface IProps extends IStyleProps {
  onChange: (date: number) => void;
  value: number; // date
}

interface IStyleProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const MINUTES_STEP = 15;

const hours = TimePickerUtils.getHoursList();
const minutes = TimePickerUtils.getMinutesList(MINUTES_STEP);

export default function TimePicker({ value, onChange, style, textStyle }: IProps) {
  const currentHour = new Date(value).getHours();
  const currentMinutes = new Date(value).getMinutes();

  function handleHoursChange(date: number, label: string, itemPosition: number) {
    const newDate = new Date(value).setHours(itemPosition).valueOf();

    onChange(newDate);
  }

  function handleMinutesChange(date: number, label: string, itemPosition: number) {
    const newDate = new Date(value).setMinutes(itemPosition * MINUTES_STEP).valueOf();
    onChange(newDate);
  }

  return (
    <UPickerGroup>
      <PickerPart
        items={hours}
        onChange={handleHoursChange}
        value={currentHour}
        style={styles.pickerPart}
        itemStyle={styles.pickerPartItem}
      />
      <PickerPart
        items={minutes}
        onChange={handleMinutesChange}
        value={currentMinutes}
        style={styles.pickerPart}
        itemStyle={styles.pickerPartItem}
      />
    </UPickerGroup>
  );
}

const styles = StyleSheet.create({
  pickerPart: { width: 35 },
  pickerPartItem: { color: '#8890A7', fontSize: 16 },
});
