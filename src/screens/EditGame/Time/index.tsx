import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Moment from 'moment';
import moment from 'moment';
import 'moment/locale/ru';
import { extendMoment } from 'moment-range';
import UButton from '../../../components/buttons/UButton';
import EditDateItem from './Item';
import withExpand from '../../../components/hocs/WIthExpand';
import GameDateInput from './GameDateInput';
import { IPickerValue } from '../../../components/Picker/types';
import { ExpandDirection } from '../../../components/Expandable';
import TimeInput from './TimeInput';
import { IRestrictions } from '../People';
import CalendarPicker from './CalendarPicker';
import { isIOS } from '../../../utils/deviceInfo';

const HOURS_COUNT = 24;
const MINUTES_COUNT = 60;
const MINUTES_STEP = 15;
const ITEMS_LENGTH = 360;
const ExpandableDateInput = withExpand(GameDateInput);
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
  // dateStart: number;
  timeStart: number[];
  timeEnd: number[];
}

export default class EditTimeModal extends React.PureComponent<IProps, IState> {
  static defaultProps = defaultProps;

  state: IState = {
    // dateStart: 0,
    timeStart: [12, 0],
    timeEnd: [14, 0],
  };

  dates: IPickerValue[] = getRangeOfDates(ITEMS_LENGTH);
  hours: IPickerValue[] = getNumbers(HOURS_COUNT);
  minutes: IPickerValue[] = getNumbers(MINUTES_COUNT, MINUTES_STEP);

  onDateChange = (value: number | string) => {
    // this.setState({ dateStart: Number(value) });
  };

  onTimeStartChange = (value: number[]) => {
    this.setState({ timeStart: value });
  };

  onTimeEndChange = (value: number[]) => {
    this.setState({ timeEnd: value });
  };

  private convertToDateNumber(pickerValue: number, pickerValues: number[]) {
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

  onSave = () => {
    const { timeStart, timeEnd } = this.state;
    const { dateStart } = this.props;
    console.log(dateStart, timeStart, timeEnd);

    this.props.onSave(
      this.convertToDateNumber(dateStart, timeStart),
      this.convertToDateNumber(dateStart, timeEnd)
    );
  };

  public render() {
    const { dateStart } = this.props;
    console.log('this.state.dateStart', dateStart);
    console.log('this.props.dateStart', this.props.dateStart);
    return (
      <View style={styles.container}>
        <EditDateItem
          label={getLabel(this.dates, dateStart)}
          icon="ios-calendar"
          renderInput={({ expanded }) =>
            isIOS ? (
              <ExpandableDateInput
                list={this.dates}
                onChange={this.onDateChange}
                value={dateStart}
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

function getRangeOfDates(days: number) {
  const _moment = extendMoment(Moment as any);
  _moment.locale('ru');
  const start = _moment().startOf('day');
  const end = _moment().add(days, 'day');

  return Array.from(
    _moment()
      .range(start, end)
      .by('day')
  ).map((date: any, index: number) => {
    const _date =
      date.format('dddd, MMM D')[0].toUpperCase() + date.format('dddd, MMM D').substr(1);

    const day = { label: _date, value: index };
    if (index === 0) {
      day.label = 'Сегодня';
    }
    if (index === 1) {
      day.label = 'Завтра';
    }
    return day;
  });
}

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
  return items[index].label;
}
