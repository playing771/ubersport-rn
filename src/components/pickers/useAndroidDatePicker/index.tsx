import { DatePickerAndroid } from 'react-native';

export async function useAndroidDatePicker(
  value: number | Date | undefined,
  onChange: (newDate: Date) => void,
  maxDate?: Date | number
) {
  const response = await DatePickerAndroid.open({
    date: value,
    mode: 'calendar',
    maxDate,
  });

  const { action, year, month, day } = response as any; // hack because of bad typings
  if (action === DatePickerAndroid.dateSetAction) {
    const newDate = new Date(year, month, day);

    onChange(newDate);
  }
}
