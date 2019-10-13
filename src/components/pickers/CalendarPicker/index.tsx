import React from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Colors from '../../../constants/Colors';
import RU_CALENDARE_LOCALE from './locale';

interface IProps {
  value: number;
  onChange?: (date: number, day: number, month: number, year: number) => void;
}

interface IMarkedDates {
  [key: string]: { selected: boolean; selectedColor?: string; [key: string]: any };
}

interface ISelectedDate {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

LocaleConfig.locales.ru = RU_CALENDARE_LOCALE;
LocaleConfig.defaultLocale = 'ru';

export default function CalendarPicker({ value, onChange }: IProps) {
  return (
    <Calendar
      current={formatDateToISO(value)}
      minDate={Date()}
      markedDates={convertDateToMarkedDate(value)}
      onDayPress={(selection: ISelectedDate) => {
        const dateValue = new Date(value);
        const { day, month, year, timestamp } = selection;
        // сохраняем значения часов и минут для нового дня
        const newTimestamp = new Date(timestamp);
        newTimestamp.setHours(dateValue.getHours());
        newTimestamp.setMinutes(dateValue.getMinutes());
        if (onChange) {
          onChange(newTimestamp.valueOf(), day, month, year);
        }
      }}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
      firstDay={1}
      // Hide day names. Default = false
      hideDayNames={true}
      // Show week numbers to the left. Default = false
      showWeekNumbers={true}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      onPressArrowLeft={(substractMonth: () => void) => substractMonth()}
      // Handler which gets executed when press arrow icon left. It receive a callback can go next month
      onPressArrowRight={(addMonth: () => void) => addMonth()}
      theme={{ arrowColor: Colors.active }}
    />
  );
}

function convertDateToMarkedDate(date: number) {
  const markedDate: IMarkedDates = {
    [formatDateToISO(date)]: {
      selected: true,
      selectedColor: Colors.active,
    },
  };
  return markedDate;
}

// date format ISO 8601
function formatDateToISO(date: string | number): string {
  return new Date(Number(date)).toISOString().split('T')[0];
}
