import moment from 'moment';
import 'moment/locale/ru';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UButton from '../../../../components/buttons/UButton';
import { ExpandDirection } from '../../../../components/Expandable';
import withExpand from '../../../../components/hocs/WIthExpand';
import CalendarPicker from '../../../../components/pickers/CalendarPicker';
import DatePicker from '../../../../components/pickers/DatePicker';
import DualTimePicker from '../../../../components/pickers/DualTimePicker';
import useAndroidTimePicker from '../../../../components/pickers/useAndroidTimePicker';
import { BASE_PADDING } from '../../../../sharedStyles';
import { getFormattedDate, getFormattedTime } from '../../../../utils/dateUtils';
import { isAndroid, isIOS } from '../../../../utils/deviceInfo';
import { IRestrictions } from '../People';
import EditableAndroidTimeLable from './EditableAndroidTimeLable';
import { EditableDateItem } from './Item';
import { getGameLength, getInitialStartingTime, getInittalEndingTime, getTimeLable } from './utils';

const ExpandableDatePicker = withExpand(DatePicker);
const ExpandableCalendar = withExpand(CalendarPicker);
const ExpandableDualTimeInput = withExpand(DualTimePicker);
const EXPAND_SETTINGS = {
  direction: ExpandDirection.Vertical,
  maxHeight: 120,
  minHeight: 15,
  openDuration: 200,
  closeDuration: 150,
};

export interface IProps {
  onSave: (dateStart: number, dateEnd: number) => void;
  dateStartRestrictions: IRestrictions;
  dateEndRestrictions: IRestrictions;
  dateStart?: number;
  dateEnd?: number;
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

  function onDatePickerChange(date: number) {
    const diff = moment(date).diff(dateStart, 'ms');

    const newEndDate = moment(dateEnd).add(diff, 'ms');
    setDateStart(date);
    setDateEnd(newEndDate.valueOf());
  }

  function onSave() {
    props.onSave(dateStart, dateEnd);
  }

  function renderEditableTimeLable() {
    return isAndroid ? (
      <EditableDateItem
        touchable={false}
        extra={getGameLength(dateStart, dateEnd)}
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
        label={getTimeLable(dateStart, dateEnd)}
        extra={getGameLength(dateStart, dateEnd)}
        icon="ios-timer"
        style={{ marginBottom: 12 }}
        renderInput={({ expanded }) => (
          <ExpandableDualTimeInput
            onDateStartChange={timeStartChangeHandle}
            onDateEndChange={timeEndChangeHandle}
            dateStart={dateStart}
            dateEnd={dateEnd}
            expanded={expanded}
            {...EXPAND_SETTINGS}
          />
        )}
      />
    );
  }

  function renderEditableDateLable() {
    return (
      <EditableDateItem
        label={getFormattedDate(dateStart, 'dddd, MMM DD ')}
        style={{ marginBottom: 12 }}
        icon="ios-calendar"
        renderInput={({ expanded }) =>
          isIOS ? (
            <ExpandableDatePicker
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
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text>
        START: {getFormattedDate(dateStart)} {getFormattedTime(dateStart)}
      </Text>
      <Text>
        END: {getFormattedDate(dateEnd)} {getFormattedTime(dateEnd)}
      </Text> */}
      {renderEditableDateLable()}
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
  itemContainer: { marginBottom: BASE_PADDING }, // compensate bottom padding if no renderInput provided
});
