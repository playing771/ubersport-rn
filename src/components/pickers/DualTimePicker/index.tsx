import React from 'react';
import { StyleProp, ViewStyle, TextStyle, Text, View, StyleSheet } from 'react-native';
import UPickerGroup from '../BasePicker';
import PickerPart from '../BasePicker/PickerPart';
import { TimePickerUtils } from '../TimePicker/utils';
import TimePicker from '../TimePicker';

interface IProps extends IStyleProps {
  dateStart: number;
  dateEnd: number;
  onDateStartChange: (dateStart: number) => void;
  onDateEndChange: (dateEnd: number) => void;
}

interface IStyleProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function DualTimePicker({
  dateStart,
  dateEnd,
  onDateStartChange,
  onDateEndChange,
}: IProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.fake, styles.fakeSide]} />
      <TimePicker onChange={onDateStartChange} value={dateStart} />
      <View style={[styles.fakeMid, styles.fake]}>
        <Text style={styles.fakeSymb}>-</Text>
      </View>
      <TimePicker onChange={onDateEndChange} value={dateEnd} />
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
});
