import React from 'react';
import { View, StyleSheet } from 'react-native';
// import Moment from 'moment';
// import { extendMoment } from 'moment-range';
import moment from 'moment';
import 'moment/locale/ru';

import UButton from '../../../components/buttons/UButton';
import EditDateItem from './Item';
import withExpand from '../../../components/hocs/WIthExpand';
import { IPickerValue } from '../../../components/pickers/Picker/types';
import { ExpandDirection } from '../../../components/Expandable';
import TimeInput from './TimeInput';
import { IRestrictions } from '../People';
import CalendarPicker from '../../../components/pickers/CalendarPicker';
import { isIOS } from '../../../utils/deviceInfo';
import DatePicker from '../../../components/pickers/DatePicker';
import getRangeOfDates from '../../../utils/getRangeOfDates';

const HOURS_COUNT = 24;
const MINUTES_COUNT = 60;
const MINUTES_STEP = 15;
const ITEMS_LENGTH = 360;
// const ExpandableDateInput = withExpand(SinglePicker);
const ExpandableDatePicker = withExpand(DatePicker);
const ExpandableCalendar = withExpand(CalendarPicker);
const ExpandableTimeInput = withExpand(TimeInput);
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
    dayPosition: this.props.dateStart ? convertDateToPickerNumber(this.props.dateStart) : 0,
    timeStart: [12, 0],
    timeEnd: [14, 0],
  };

  dates: IPickerValue[] = getRangeOfDates(ITEMS_LENGTH);
  hours: IPickerValue[] = getNumbers(HOURS_COUNT);
  minutes: IPickerValue[] = getNumbers(MINUTES_COUNT, MINUTES_STEP);

  private convertNumberToDate(pickerValue: number, pickerValues: number[]) {
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

  onDateChange = (value: number | string) => {
    console.log('onDateChange', value);
    this.setState({ dayPosition: Number(value) });
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

    this.props.onSave(
      this.convertNumberToDate(dayPosition, timeStart),
      this.convertNumberToDate(dayPosition, timeEnd)
    );
  };

  public render() {
    const { dayPosition } = this.state;
    console.log('this.state.dayPosition', dayPosition);
    return (
      <View style={styles.container}>
        <EditDateItem
          label={getLabel(this.dates, dayPosition)}
          icon="ios-calendar"
          renderInput={({ expanded }) =>
            isIOS ? (
              <ExpandableDatePicker
                // list={this.dates}
                onChange={this.onDateChange}
                value={dayPosition}
                expanded={expanded}
                {...EXPAND_SETTINGS}
              />
            ) : (
              <ExpandableCalendar expanded={expanded} {...EXPAND_SETTINGS} />
            )
          }
        />
        <EditDateItem
          label={
            getLabel(this.hours, this.state.timeStart[0]) +
            ':' +
            getLabel(this.minutes, this.state.timeStart[1]) +
            ' - ' +
            getLabel(this.hours, this.state.timeEnd[0]) +
            ':' +
            getLabel(this.minutes, this.state.timeEnd[1])
          }
          icon="ios-timer"
          renderInput={({ expanded }) => (
            <ExpandableTimeInput
              hours={this.hours}
              minutes={this.minutes}
              onStartChange={this.onTimeStartChange}
              onEndChange={this.onTimeEndChange}
              startValue={this.state.timeStart}
              endValue={this.state.timeEnd}
              expanded={expanded}
              {...EXPAND_SETTINGS}
            />
          )}
        />

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
});

function getNumbers(count: number, step: number = 1) {
  const hours: IPickerValue[] = [];
  for (let index = 0; index * step < count; index++) {
    const pickerValue: IPickerValue = {
      label: String(index * step),
      value: index,
    };
    if (index * step < 10) {
      pickerValue.label = '0' + pickerValue.label;
    }
    hours[index] = pickerValue;
  }
  hours[hours.length] = { label: hours[0].label, value: hours.length };

  return hours;
}

function getLabel(items: IPickerValue[], index: number) {
  // if (items[index] === undefined) {
  //   console.log(items);
  //   console.log('getLabel', index);
  // }
  return items[index].label;
}

function convertDateToPickerNumber(date: number) {
  // const dates = getRangeOfDates(ITEMS_LENGTH);
  const today = Date.now().valueOf();
  if (date < today) {
    throw new Error('convertDateToPickerNumber error, date > today');
  }

  const days = Math.round(daysBetween(today, date));

  return days;
}

function daysBetween(startDate: number, endDate: number) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

function treatAsUTC(date: number): number {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result.valueOf();
}
