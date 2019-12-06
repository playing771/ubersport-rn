import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import TimePicker from '../TimePicker';

interface IProps extends IStyleProps {
  dateStart: number;
  dateEnd: number;
  onDateStartChange: (dateStart: number) => void;
  onDateEndChange: (dateEnd: number) => void;
  min?: Date;
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
  min,
}: IProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.fake, styles.fakeSide]} />
      <TimePicker onChange={onDateStartChange} value={dateStart} min={min} />
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
