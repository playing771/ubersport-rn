import { TimePickerAndroid } from 'react-native';

const ROUND_TO_MINUTES = 15;

export default async function useAndroidTimePicker(
  value: number,
  onChange: (newDate: number, hour: number, minute: number) => void,
  min?: Date
) {
  const response = await TimePickerAndroid.open({
    hour: new Date(value).getHours(),
    minute: new Date(value).getMinutes(),
    is24Hour: true, // Will display '2 PM'
    mode: 'default',
  });

  const { action, hour, minute } = response as any; // hack because of bad typings
  if (action === TimePickerAndroid.timeSetAction) {
    const date = new Date(value);

    date.setHours(hour, minute);
    const interval = 1000 * 60 * ROUND_TO_MINUTES; // 15 min
    // если есть min и выбранное время меньше, то оставляем значение min
    // + округялем до interval вверх
    const newDate =
      !min || date.valueOf() > min.valueOf()
        ? date
        : new Date(Math.ceil(min.getTime() / interval) * interval);

    onChange(Number(newDate), hour, minute);
  }
}
