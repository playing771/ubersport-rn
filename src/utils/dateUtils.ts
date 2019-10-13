import moment from 'moment';

const DEFAULT_DATE_FORMAT = 'ddd DD MMMM';

export function getFormattedDate(dateInput: number, format: string = DEFAULT_DATE_FORMAT) {
  const date = moment(dateInput);
  return date.format(format)[0].toUpperCase() + date.format(format).substr(1);
}

export function getFormattedTime(dateInput: number) {
  const _date = moment(dateInput);
  const FORMAT = 'HH:mm';
  // console.log('getFormattedTime', _date.format(FORMAT));

  return _date.format(FORMAT);
}
