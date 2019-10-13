import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TimePickerAndroid,
  TimePickerAndroidOpenReturn,
} from 'react-native';
// import Moment from 'moment';
// import { extendMoment } from 'moment-range';
import moment, { Moment } from 'moment';
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
import { getFormattedTime, getFormattedDate } from '../../../utils/dateUtils';
import useAndroidTimePicker from '../../../components/pickers/useAndroidTimePicker';

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

const DEFAULT_GAME_LENGTH = 2; // 2h
const DEFAULT_NEW_GAME_TIMEOUT = 15; // 15 minutes

export interface IProps {
  onSave: (dateStart: number, dateEnd: number) => void;
  dateStartRestrictions: IRestrictions;
  dateEndRestrictions: IRestrictions;
  dateStart?: number;
  dateEnd?: number;
}

export interface IState {
  dateStart: number;
  dateEnd: number;
  // dayPosition: number; // picker position from today date
  // timeStart: number[];
  // timeEnd: number[];
}

export default function EditTimeModal(props: IProps) {
  const [dateStart, setDateStart] = useState<number>(
    props.dateStart ? props.dateStart : getInitialStartingTime()
  );
  const [dateEnd, setDateEnd] = useState<number>(
    props.dateEnd ? this.props.dateEnd : getInittalEndingTime(dateStart)
  );

  function dateStartPressHandle() {
    useAndroidTimePicker(dateStart, newDate => {
      setDateStart(newDate);
      if (newDate > dateEnd) {
        const newDateEnd = moment(dateEnd);
        newDateEnd.add(24, 'hours');
        setDateEnd(newDateEnd.valueOf());
      }
    });
  }

  function dateEndPressHandle() {
    useAndroidTimePicker(dateEnd, newDate => {
      if (newDate < dateStart) {
        const newDateEnd = moment(newDate);
        newDateEnd.add(24, 'hours');
        setDateEnd(newDateEnd.valueOf());
      } else {
        const newDateEnd = moment(newDate);
        if (newDateEnd.diff(moment(dateStart), 'day') >= 1) {
          newDateEnd.subtract(1, 'day');
        }
        setDateEnd(newDateEnd.valueOf());
      }
    });
  }

  // console.log('useAndroidTimePicker', date, hour, minute);

  // state: IState = {
  //   dateStart: this.props.dateStart ? this.props.dateStart : new Date().valueOf(),
  //   dateEnd: this.props.dateEnd ? this.props.dateEnd : new Date().valueOf(),
  //   // dayPosition: this.props.dateStart
  //   //   ? PickerUtils.convertDateToPickerPosition(this.props.dateStart)
  //   //   : 0,
  //   // timeStart: [this.getStartingHour(), 0],
  //   // timeEnd: [this.getEndingHour(), 0],
  // };

  // dates: IPickerValue[] = getRangeOfDates(ITEMS_LENGTH);
  // hours: IPickerValue[] = TimePickerUtils.getHoursList();
  // minutes: IPickerValue[] = TimePickerUtils.getMinutesList();

  // const getStartingHour = () => {
  //   const now = new Date();
  //   return now.getHours() + Math.round(now.getMinutes() / 60);
  // };

  // const getEndingHour = () => {
  //   const now = new Date();
  //   now.setHours(now.getHours() + Math.round(now.getMinutes() / 60) + DEFAULT_GAME_LENGTH);
  //   return now.getHours();
  // };

  // const convertPickerPositionToDate = (dayPosition: number, pickerValues: number[]) => {
  //   console.log('pickerValues[0]', pickerValues[0]);
  //   console.log('pickerValues[1]', pickerValues[1]);

  //   const now = moment();
  //   console.log('startOf', now.startOf('day'));

  //   now
  //     .startOf('day')
  //     .add(dayPosition, 'days')
  //     .add(pickerValues[0], 'hours')
  //     .add(pickerValues[1], 'minutes')
  //     .toDate();

  //   console.log('date', now);
  //   console.log('valueOf', now.valueOf());

  //   // const tmp = new Date(
  //   //   _date.getFullYear(),
  //   //   _date.getMonth(),
  //   //   _date.getDate(),
  //   //   Number(this.hours[pickerValues[0]].label),
  //   //   Number(this.hours[pickerValues[1]].label)
  //   // );

  //   // return tmp.getTime();
  //   return now.valueOf();
  // };

  const getTimeLable = () => {
    return getFormattedTime(this.state.dateStart) + ' - ' + getFormattedTime(this.state.dateEnd);
    // getLabel(this.hours, this.state.timeEnd[0]) +
    // ':' +
    // getLabel(this.minutes, this.state.timeEnd[1])
  };

  const onDatePickerChange = (pickerValue: number | string, itemPosition: number) => {
    console.log('pickerValue', pickerValue, itemPosition);

    // this.setState({ dayPosition: itemPosition });
  };

  const onCalendarPickerChange = (date: number) => {
    // const dayPosition = PickerUtils.convertDateToPickerPosition(date);
    setDateStart(date);
    // this.setState({ dayPosition });
  };

  const onTimeStartChange = (value: number[]) => {
    // console.log('onTimeStartChange', value);
    // this.setState({ timeStart: value });
  };

  const onTimeEndChange = (value: number[]) => {
    // this.setState({ timeEnd: value });
  };

  const onSave = () => {
    // const { dayPosition, timeStart, timeEnd } = this.state;
    // console.log('dayPosition', dayPosition);
    // console.log('timeStart', timeStart);
    // console.log('timeEnd', timeEnd);
    // const dateStart = this.convertPickerPositionToDate(dayPosition, timeStart);
    // const dateEnd = this.convertPickerPositionToDate(dayPosition, timeEnd);
    // this.props.onSave(dateStart, dateEnd);
  };

  // const useAndroidTimePicker = async () => {
  //   try {
  //     const response = await TimePickerAndroid.open({
  //       hour: new Date(dateStart).getHours(),
  //       minute: new Date(dateStart).getMinutes(),
  //       is24Hour: true, // Will display '2 PM'
  //       mode: 'default',
  //     });

  //     const { action, hour, minute } = response as any; // hack because of bad typings
  //     if (action === TimePickerAndroid.timeSetAction) {
  //       // Selected hour (0-23), minute (0-59)

  //       const oldDateStart = new Date(dateStart);
  //       oldDateStart.setHours(hour, minute);
  //       setDateStart(Number(oldDateStart));
  //       const oldDateEnd = new Date(dateEnd);
  //       oldDateEnd.setHours(hour, minute);
  //       setDateEnd(Number(oldDateEnd));
  //     }
  //   } catch ({ code, message }) {
  //     console.warn('Cannot open time picker', message);
  //   }
  // };

  const renderEditableTimeLable = () => {
    console.log('astarttime', new Date(dateStart));
    return isAndroid ? (
      <EditDateItem
        touchable={false}
        extra={
          moment(dateEnd)
            .diff(moment(dateStart), 'hours')
            .toLocaleString() + ' h'
        }
        label={
          <View style={{ flexDirection: 'row', paddingLeft: 18 }}>
            <EditableAndroidTimeLable
              onPress={dateStartPressHandle}
              label={
                getFormattedTime(dateStart)
                // getLabel(this.hours, timeStart[0]) +
                // ' : ' +
                // getLabel(this.minutes, timeStart[1])
              }
            />
            <Text style={{ fontSize: 15 }}> - </Text>
            <EditableAndroidTimeLable
              onPress={dateEndPressHandle}
              label={
                getFormattedTime(dateEnd)
                // getLabel(this.hours, timeEnd[0]) +
                // ' : ' +
                // getLabel(this.minutes, timeEnd[1])
              }
            />
          </View>
        }
        icon="ios-timer"
        style={styles.itemContainer}
      />
    ) : (
      <EditDateItem
        label={getTimeLable()}
        icon="ios-timer"
        style={{ marginBottom: 12 }}
        renderInput={({ expanded }) => (
          <></>
          // <ExpandableTimeInput
          //   onStartChange={this.onTimeStartChange}
          //   onEndChange={this.onTimeEndChange}
          //   startValue={timeStart}
          //   endValue={timeEnd}
          //   expanded={expanded}
          //   {...EXPAND_SETTINGS}
          // />
        )}
      />
    );
  };

  // const { dayPosition, timeStart } = this.state;
  // const lable = getLabel(this.dates, dayPosition);
  // console.log('MODAL dayPosition', dayPosition);
  // console.log('lable', lable);

  return (
    <View style={styles.container}>
      <EditDateItem
        label={getFormattedDate(dateStart, 'dddd, MMM DD ')}
        style={{ marginBottom: 12 }}
        icon="ios-calendar"
        renderInput={({ expanded }) =>
          isIOS ? (
            <ExpandableDatePicker
              // list={this.dates}
              onChange={onDatePickerChange}
              value={dateStart}
              expanded={expanded}
              {...EXPAND_SETTINGS}
            />
          ) : (
            <ExpandableCalendar
              expanded={expanded}
              {...EXPAND_SETTINGS}
              value={dateStart}
              onChange={onCalendarPickerChange}
            />
          )
        }
      />
      {/* <Text>
        START: {getFormattedDate(dateStart)} {getFormattedTime(dateStart)}
      </Text>
      <Text>
        END: {getFormattedDate(dateEnd)} {getFormattedTime(dateEnd)}
      </Text> */}
      {renderEditableTimeLable()}
      <UButton
        title="Сохранить"
        style={styles.saveBtn}
        backgroundColor="#00BBBB"
        textStyle={styles.saveBtnText}
        rounded={false}
        onPress={onSave}
      />
    </View>
  );
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

// function getLabel(items: IPickerValue[], index: number) {
//   // if (items[index] === undefined) {
//   //   console.log(items);
//   //   console.log('getLabel', index);
//   // }
//   return items[index].label;
// }

function getInitialStartingTime() {
  return roundNext15Minutes(moment()).valueOf();
}

function getInittalEndingTime(dateStart: number) {
  return moment(dateStart)
    .add(DEFAULT_GAME_LENGTH, 'hours')
    .valueOf();
}

function roundNext15Minutes(dateToRound: Moment) {
  const newDate = dateToRound.clone();
  let intervals = Math.floor(newDate.minutes() / 15);
  if (newDate.minutes() % 15 !== 0) {
    intervals++;
  }
  if (intervals === 4) {
    newDate.add('hours', 1);
    intervals = 0;
  }
  newDate.minutes(intervals * 15);
  newDate.seconds(0);
  return newDate;
}
