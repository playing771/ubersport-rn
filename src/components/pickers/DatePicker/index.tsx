import React from 'react';

import SinglePicker from '../SinglePicker';
import { IPickerValue } from '../Picker/types';
import getRangeOfDates from '../../../utils/getRangeOfDates';

const ITEMS_LENGTH = 360;
const DATES: IPickerValue[] = getRangeOfDates(ITEMS_LENGTH);

interface IProps {
  value: number;
  onChange?: (date: number, label: string, itemPosition: number) => void;
}

export default function DatePicker({ value, onChange }: IProps) {
  return <SinglePicker list={DATES} onChange={onChange} value={value} />;
}
