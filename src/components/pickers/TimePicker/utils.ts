import { IPickerValue } from '../BasePicker/types';

const HOURS_COUNT = 24;
const MINUTES_COUNT = 60;
const MINUTES_STEP = 15;

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

function getHoursList() {
  return getNumbers(HOURS_COUNT);
}

function getMinutesList(minutesStep = MINUTES_STEP) {
  return getNumbers(MINUTES_COUNT, minutesStep);
}

export const TimePickerUtils = {
  getHoursList,
  getMinutesList,
};
