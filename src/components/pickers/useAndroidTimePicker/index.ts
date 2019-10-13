import { TimePickerAndroid } from 'react-native';

export default async function useAndroidTimePicker(
  value: number,
  onChange: (newDate: number, hour: number, minute: number) => void
) {
  const response = await TimePickerAndroid.open({
    hour: new Date(value).getHours(),
    minute: new Date(value).getMinutes(),
    is24Hour: true, // Will display '2 PM'
    mode: 'default',
  });

  const { action, hour, minute } = response as any; // hack because of bad typings
  if (action === TimePickerAndroid.timeSetAction) {
    const newDate = new Date(value);
    newDate.setHours(hour, minute);
    onChange(Number(newDate), hour, minute);
  }
}
