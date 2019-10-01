import React from 'react';
import { StyleProp, ViewStyle, TextStyle, Text, View, StyleSheet } from 'react-native';
import UPickerGroup from '../Picker';
import PickerPart from '../Picker/PickerPart';
import { TimePickerUtils } from './utils';

interface IProps extends IStyleProps {
  onStartChange: (start: number[]) => void;
  onEndChange: (end: number[]) => void;
  startValue: number[];
  endValue: number[];
}

interface IStyleProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

function TimePicker(props: IProps) {
  const onStartHoursChange = (value: number | string) => {
    const start = [...props.startValue];
    start[0] = Number(value);

    props.onStartChange(start);
  };

  const onStartMinutesChange = (value: number | string) => {
    const start = [...props.startValue];
    start[1] = Number(value);
    props.onStartChange(start);
  };

  const onEndHoursChange = (value: number | string) => {
    const end = [...props.endValue];
    end[0] = Number(value);
    props.onEndChange(end);
  };

  const onEndMinutesChange = (value: number | string) => {
    const end = [...props.endValue];
    end[1] = Number(value);
    props.onEndChange(end);
  };

  const hours = TimePickerUtils.getHoursList();
  const minutes = TimePickerUtils.getMinutesList();

  return (
    <View style={styles.wrapper}>
      <View style={[styles.fake, styles.fakeSide]} />
      <UPickerGroup>
        <PickerPart
          items={hours}
          onChange={onStartHoursChange}
          selected={props.startValue[0]}
          style={styles.pickerPart}
          itemStyle={styles.pickerPartItem}
        />
        <PickerPart
          items={minutes}
          onChange={onStartMinutesChange}
          selected={props.startValue[1]}
          style={styles.pickerPart}
          itemStyle={styles.pickerPartItem}
        />
      </UPickerGroup>
      <View style={[styles.fakeMid, styles.fake]}>
        <Text style={styles.fakeSymb}>-</Text>
      </View>
      <UPickerGroup>
        <PickerPart
          items={hours}
          onChange={onEndHoursChange}
          selected={props.endValue[0]}
          style={styles.pickerPart}
          itemStyle={styles.pickerPartItem}
        />
        <PickerPart
          items={minutes}
          onChange={onEndMinutesChange}
          selected={props.endValue[1]}
          style={styles.pickerPart}
          itemStyle={styles.pickerPartItem}
        />
      </UPickerGroup>
      <View style={[styles.fake, styles.fakeSide]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 15,
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

export default TimePicker;
