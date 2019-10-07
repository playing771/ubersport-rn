import React from 'react';
import { View, StyleSheet, Text, TimePickerAndroid } from 'react-native';
// import Moment from 'moment';
// import { extendMoment } from 'moment-range';
import moment from 'moment';
import 'moment/locale/ru';

import UButton from '../../../components/buttons/UButton';
import EditDateItem from './Item';
import withExpand from '../../../components/hocs/WIthExpand';
import { IPickerValue } from '../../../components/pickers/Picker/types';
import { ExpandDirection } from '../../../components/Expandable';
import TimePicker from '../../../components/pickers/TimePicker';
import { IRestrictions } from '../People';
import CalendarPicker from '../../../components/pickers/CalendarPicker';
import { isIOS, isAndroid } from '../../../utils/deviceInfo';
import DatePicker from '../../../components/pickers/DatePicker';
import getRangeOfDates from '../../../utils/getRangeOfDates';
import { PickerUtils } from '../../../components/pickers/DatePicker/utils';
import { TimePickerUtils } from '../../../components/pickers/TimePicker/utils';
import EditableAndroidTimeLable from './EditableAndroidTimeLable';

const ITEMS_LENGTH = 360;
// const ExpandableDateInput = withExpand(SinglePicker);
const ExpandableDatePicker = withExpand(DatePicker);
const ExpandableCalendar = withExpand(CalendarPicker);
const ExpandableTimeInput = withExpand(TimePicker);
const EXPAND_SETTINGS = {
  direction: ExpandDirection.Vertical,
  maxHeight: 120,
  minHeight: 15,
  openDuration: 200,
  closeDuration: 150,
};

const defaultProps = {
  dateStart: 0,
};

export interface IProps {
  onSave: (dateStart: number, dateEnd: number) => void;
  dateStartRestrictions: IRestrictions;
  dateEndRestrictions: IRestrictions;
  dateStart?: number;
}

export interface IState {
  dayPosition: number; // picker position from today date
  timeStart: number[];
  timeEnd: number[];
}

export default class EditTimeModal extends React.PureComponent<IProps, IState> {
  static defaultProps = defaultProps;

  state: IState = {
    dayPosition: this.props.dateStart
      ? PickerUtils.convertDateToPickerPosition(this.props.dateStart)
      : 0,
    timeStart: [12, 0],
    timeEnd: [14, 0],
  };

  dates: IPickerValue[] = getRangeOfDates(ITEMS_LENGTH);
  hours: IPickerValue[] = TimePickerUtils.getHoursList();
  minutes: IPickerValue[] = TimePickerUtils.getMinutesList();

  private convertPickerPositionToDate(pickerValue: number, pickerValues: number[]) {
    const _date = moment()
      .add(pickerValue, 'days')
      .toDate();

    const tmp = new Date(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      Number(this.hours[pickerValues[0]].label),
      Number(this.hours[pickerValues[1]].label)
    );

    return tmp.getTime();
  }

  private getTimeLable = () => {
    return (
      getLabel(this.hours, this.state.timeStart[0]) +
      ':' +
      getLabel(this.minutes, this.state.timeStart[1]) +
      ' - ' +
      getLabel(this.hours, this.state.timeEnd[0]) +
      ':' +
      getLabel(this.minutes, this.state.timeEnd[1])
    );
  };

  onDatePickerChange = (pickerValue: number | string) => {
    console.log('onDatePickerChange', pickerValue);
    this.setState({ dayPosition: Number(pickerValue) });
  };

  onCalendarPickerChange = (date: number) => {
    const dayPosition = PickerUtils.convertDateToPickerPosition(date);
    console.log('dayPosition', dayPosition);
    this.setState({ dayPosition });
  };

  onTimeStartChange = (value: number[]) => {
    this.setState({ timeStart: value });
  };

  onTimeEndChange = (value: number[]) => {
    this.setState({ timeEnd: value });
  };

  onSave = () => {
    const { dayPosition, timeStart, timeEnd } = this.state;

    console.log('onSave', dayPosition, timeStart, timeEnd);
    const dateStart = this.convertPickerPositionToDate(dayPosition, timeStart);
    const dateEnd = this.convertPickerPositionToDate(dayPosition, timeEnd);
    this.props.onSave(dateStart, dateEnd);
  };

  private async openAndroidTimePicker() {
    try {
      const { action } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: true, // Will display '2 PM'
        mode: 'default',
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }

  private renderEditableTimeLable() {
    return isAndroid ? (
      <EditDateItem
        touchable={false}
        label={
          <View style={{ flexDirection: 'row', paddingLeft: 18 }}>
            <EditableAndroidTimeLable
              onPress={this.openAndroidTimePicker}
              label={
                getLabel(this.hours, this.state.timeStart[0]) +
                ' : ' +
                getLabel(this.minutes, this.state.timeStart[1])
              }
            />
            <Text style={{ fontSize: 15 }}> - </Text>
            <EditableAndroidTimeLable
              onPress={this.openAndroidTimePicker}
              label={
                getLabel(this.hours, this.state.timeEnd[0]) +
                ' : ' +
                getLabel(this.minutes, this.state.timeEnd[1])
              }
            />
          </View>
        }
        icon="ios-timer"
        style={styles.itemContainer}
      />
    ) : (
      <EditDateItem
        label={this.getTimeLable()}
        icon="ios-timer"
        style={{ marginBottom: 12 }}
        renderInput={({ expanded }) => (
          <ExpandableTimeInput
            onStartChange={this.onTimeStartChange}
            onEndChange={this.onTimeEndChange}
            startValue={this.state.timeStart}
            endValue={this.state.timeEnd}
            expanded={expanded}
            {...EXPAND_SETTINGS}
          />
        )}
      />
    );
  }

  public render() {
    const { dayPosition, timeStart } = this.state;
    console.log('this.state.dayPosition', dayPosition);
    return (
      <View style={styles.container}>
        <EditDateItem
          label={getLabel(this.dates, dayPosition)}
          style={{ marginBottom: 12 }}
          icon="ios-calendar"
          renderInput={({ expanded }) =>
            isIOS ? (
              <ExpandableDatePicker
                // list={this.dates}
                onChange={this.onDatePickerChange}
                value={dayPosition}
                expanded={expanded}
                {...EXPAND_SETTINGS}
              />
            ) : (
              <ExpandableCalendar
                expanded={expanded}
                {...EXPAND_SETTINGS}
                value={String(this.convertPickerPositionToDate(dayPosition, timeStart))}
                onChange={this.onCalendarPickerChange}
              />
            )
          }
        />
        {this.renderEditableTimeLable()}
        <UButton
          title="Сохранить"
          style={styles.saveBtn}
          backgroundColor="#00BBBB"
          textStyle={styles.saveBtnText}
          rounded={false}
          onPress={this.onSave}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 28,
    borderRadius: 4,
    overflow: 'hidden',
  },
  saveBtn: { width: '100%', height: 50 },
  saveBtnText: { fontWeight: '600', fontSize: 16 },
  itemContainer: { marginBottom: 24 }, // compensate bottom padding if no renderInput provided
});

function getLabel(items: IPickerValue[], index: number) {
  // if (items[index] === undefined) {
  //   console.log(items);
  //   console.log('getLabel', index);
  // }
  return items[index].label;
}
