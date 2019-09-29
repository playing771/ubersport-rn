import React from 'react';

import SinglePicker from './SinglePicker';
import { IPickerValue } from './Picker/types';
import getRangeOfDates from '../../utils/getRangeOfDates';

const ITEMS_LENGTH = 360;

interface IProps {
  value: number;
  onChange?: (value: number | string) => void;
}

export default function DatePicker({ value, onChange }: IProps) {
  const dates: IPickerValue[] = getRangeOfDates(ITEMS_LENGTH);

  return <SinglePicker list={dates} onChange={onChange} value={value} />;
}
