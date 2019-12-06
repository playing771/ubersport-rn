import moment from 'moment';
import React from 'react';
import getRangeOfDates from '../../../utils/getRangeOfDates';
import { IPickerValue } from '../BasePicker/types';
import SinglePicker from '../SinglePicker';

const ITEMS_LENGTH = 360;
const DATES: IPickerValue[] = getRangeOfDates(ITEMS_LENGTH);

interface IProps {
  value: number;
  onChange?: (date: number, label: string, itemPosition: number) => void;
}

export default function DatePicker({ value, onChange }: IProps) {
  function dateChangeHandle(newValue: number, label: string, itemPosition: number) {
    const newDate = moment(newValue);
    const oldDate = moment(value);
    const diff = newDate.diff(moment(oldDate).startOf('d'), 'd');

    oldDate.add(diff, 'd');
    if (onChange) {
      onChange(oldDate.valueOf(), label, itemPosition);
    }
  }
  // значения пикера являются время (и дата) начала каждого дня
  // поэтому текущее значение времени приводим к началу дня
  return (
    <SinglePicker
      list={DATES}
      onChange={dateChangeHandle}
      value={moment(value)
        .startOf('d')
        .valueOf()}
    />
  );
}
