import * as React from 'react';
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  Text,
  View,
  StyleSheet
} from 'react-native';
import UPickerGroup from '../../../components/Picker';
import PickerPart from '../../../components/Picker/PickerPart';
import { IPickerValue } from '../../../components/Picker/types';

interface IProps extends IStyleProps {
  // onChange: (value: number | string) => void;
  // value: number;
  hours: IPickerValue[];
  minutes: IPickerValue[];
  onStartChange: (start: number[]) => void;
  onEndChange: (end: number[]) => void;
  startValue: number[];
  endValue: number[];
}

interface IStyleProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

interface IState {}

class TimeInput extends React.PureComponent<IProps, IState> {
  onStartHoursChange = (value: number | string) => {
    const start = [...this.props.startValue];
    start[0] = Number(value);
    console.log('ON HOURS CHANGE');

    this.props.onStartChange(start);
  }

  onStartMinutesChange = (value: number | string) => {
    const start = [...this.props.startValue];
    start[1] = Number(value);
    this.props.onStartChange(start);
  }

  onEndHoursChange = (value: number | string) => {
    const end = [...this.props.endValue];
    end[0] = Number(value);
    this.props.onEndChange(end);
  }

  onEndMinutesChange = (value: number | string) => {
    const end = [...this.props.endValue];
    end[1] = Number(value);
    this.props.onEndChange(end);
  }

  public render() {
    return (
      <View style={styles.wrapper}>
        <View style={[styles.fake, styles.fakeSide]} />
        <UPickerGroup>
          <PickerPart
            items={this.props.hours}
            onChange={this.onStartHoursChange}
            selected={this.props.startValue[0]}
            style={styles.pickerPart}
            itemStyle={styles.pickerPartItem}
          />
          <PickerPart
            items={this.props.minutes}
            onChange={this.onStartMinutesChange}
            selected={this.props.startValue[1]}
            style={styles.pickerPart}
            itemStyle={styles.pickerPartItem}
          />
        </UPickerGroup>
        <View style={[styles.fakeMid, styles.fake]}>
          <Text style={styles.fakeSymb}>-</Text>
        </View>
        <UPickerGroup>
          <PickerPart
            items={this.props.hours}
            onChange={this.onEndHoursChange}
            selected={this.props.endValue[0]}
            style={styles.pickerPart}
            itemStyle={styles.pickerPartItem}
          />
          <PickerPart
            items={this.props.minutes}
            onChange={this.onEndMinutesChange}
            selected={this.props.endValue[1]}
            style={styles.pickerPart}
            itemStyle={styles.pickerPartItem}
          />
        </UPickerGroup>
        <View style={[styles.fake, styles.fakeSide]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 15
  },
  fake: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#CDCDCD',
    height: 38.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fakeSymb: { color: '#8890A7', fontSize: 16 },
  fakeSide: { flex: 1 },
  fakeMid: { width: 30 },
  pickerPart: { width: 35 },
  pickerPartItem: { color: '#8890A7', fontSize: 16 }
});

export default TimeInput;
