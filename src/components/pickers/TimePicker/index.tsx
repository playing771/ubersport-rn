import React from 'react';
import { StyleProp, ViewStyle, TextStyle, Text, View, StyleSheet } from 'react-native';
import UPickerGroup from '../BasePicker';
import PickerPart from '../BasePicker/PickerPart';
import { TimePickerUtils } from '../TimePicker/utils';
import moment from 'moment';
import { getFormattedTime } from '../../../utils/dateUtils';

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
  const handleHoursChange = (date: number, label: string, itemPosition: number) => {
    console.log('handleHoursChange', itemPosition);

    const newDate = moment(value)
      .add(itemPosition, 'h')
      .valueOf();
    console.log(
      'TimePicker new Date',
      new Date(newDate).getHours(),
      new Date(newDate).getMinutes()
    );
    console.log('getFormattedTime(newDate)', getFormattedTime(newDate));

    onChange(newDate);
  };

  const handleMinutesChange = (date: number, label: string, itemPosition: number) => {
    console.log('handleMinutesChange', itemPosition);

    const newDate = moment(value)
      .add(itemPosition * MINUTES_STEP, 'm')
      .valueOf();
    onChange(newDate);
  };

  const currentHour = new Date(value).getHours();
  const currentMinutes = new Date(value).getMinutes();

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
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    // marginTop: 24,s
  },
  fake: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#CDCDCD',
    height: 38.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fakeSymb: { color: '#8890A7', fontSize: 16 },
  fakeSide: { flex: 1 },
  fakeMid: { width: 30 },
  pickerPart: { width: 35 },
  pickerPartItem: { color: '#8890A7', fontSize: 16 },
});
