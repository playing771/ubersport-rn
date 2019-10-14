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
import EditableDateItem from './Item';
import withExpand from '../../../components/hocs/WIthExpand';
import { IPickerValue } from '../../../components/pickers/BasePicker/types';
import { ExpandDirection } from '../../../components/Expandable';
import DualTimePicker from '../../../components/pickers/DualTimePicker';
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
import TimePicker from '../../../components/pickers/TimePicker';

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
    props.dateEnd ? props.dateEnd : getInittalEndingTime(dateStart)
  );

  function dateStartPressHandle() {
    useAndroidTimePicker(dateStart, timeStartChangeHandle);
  }

  function dateEndPressHandle() {
    useAndroidTimePicker(dateEnd, timeEndChangeHandle);
  }

  function timeStartChangeHandle(newDate: number) {
    setDateStart(newDate);
    if (newDate > dateEnd) {
      const newDateEnd = moment(dateEnd);
      newDateEnd.add(24, 'h');
      setDateEnd(newDateEnd.valueOf());
    }
  }

  function timeEndChangeHandle(newDate: number) {
    if (newDate < dateStart) {
      const newDateEnd = moment(newDate);
      newDateEnd.add(24, 'h');
      setDateEnd(newDateEnd.valueOf());
    } else {
      const newDateEnd = moment(newDate);
      if (newDateEnd.diff(moment(dateStart), 'd') >= 1) {
        newDateEnd.subtract(1, 'd');
      }

      setDateEnd(newDateEnd.valueOf());
    }
  }

  const getTimeLable = () => {
    return getFormattedTime(dateStart) + ' - ' + getFormattedTime(dateEnd);
    // getLabel(this.hours, timeEnd[0]) +
    // ':' +
    // getLabel(this.minutes, timeEnd[1])
  };

  const onDatePickerChange = (date: number) => {
    const diff = moment(date).diff(dateStart, 'ms');
    // console.log('daysDiff', diff);

    const newEndDate = moment(dateEnd).add(diff, 'ms');
    setDateStart(date);
    setDateEnd(newEndDate.valueOf());
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
    props.onSave(dateStart, dateEnd);
  };

  const renderEditableTimeLable = () => {
    return isAndroid ? (
      <EditableDateItem
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
              label={getFormattedTime(dateStart)}
            />
            <Text style={{ fontSize: 15 }}> - </Text>
            <EditableAndroidTimeLable
              onPress={dateEndPressHandle}
              label={getFormattedTime(dateEnd)}
            />
          </View>
        }
        icon="ios-timer"
        style={styles.itemContainer}
      />
    ) : (
      <EditableDateItem
        label={getTimeLable()}
        icon="ios-timer"
        style={{ marginBottom: 12 }}
        renderInput={({ expanded }) => (
          <ExpandableTimeInput
            onChange={timeStartChangeHandle}
            value={dateStart}
            expanded={expanded}
            {...EXPAND_SETTINGS}
          />
        )}
      />
    );
  };

  console.log('DDATE START!!', new Date(dateStart).getHours(), new Date(dateStart).getMinutes());

  return (
    <View style={styles.container}>
      <EditableDateItem
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
              onChange={onDatePickerChange}
            />
          )
        }
      />
      <Text>
        START: {getFormattedDate(dateStart)} {getFormattedTime(dateStart)}
      </Text>
      <Text>
        END: {getFormattedDate(dateEnd)} {getFormattedTime(dateEnd)}
      </Text>
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
  let intervals = Math.floor(newDate.minutes() / DEFAULT_NEW_GAME_TIMEOUT);
  if (newDate.minutes() % DEFAULT_NEW_GAME_TIMEOUT !== 0) {
    intervals++;
  }
  if (intervals === 60 / DEFAULT_NEW_GAME_TIMEOUT) {
    newDate.add('hours', 1);
    intervals = 0;
  }
  newDate.minutes(intervals * DEFAULT_NEW_GAME_TIMEOUT);
  newDate.seconds(0);
  return newDate;
}
