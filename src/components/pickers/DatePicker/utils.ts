import moment from 'moment';
import 'moment/locale/ru';

function convertDateToPickerPosition(date: number) {
  // const dates = getRangeOfDates(ITEMS_LENGTH);
  const today = Date.now().valueOf();


  const days = Math.round(daysBetween(today, date));
  if (days <= -1) {
    throw new Error('convertDateToPickerPosition error, selected date < today');
  }
  // can be -0
  return Math.abs(days);
}

function daysBetween(startDate: number, endDate: number) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;

  function treatAsUTC(date: number): number {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result.valueOf();
  }
}

// function convertPickerPositionToDate(pickerValue: number, pickerValues: number[]) {
//   const _date = moment()
//     .add(pickerValue, 'days')
//     .toDate();

//   const tmp = new Date(
//     _date.getFullYear(),
//     _date.getMonth(),
//     _date.getDate(),
//     Number(this.hours[pickerValues[0]].label),
//     Number(this.hours[pickerValues[1]].label)
//   );

//   return tmp.getTime();
// }

export const PickerUtils = {
  convertDateToPickerPosition,
  daysBetween,
};
