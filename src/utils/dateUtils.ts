import moment from 'moment';

export function getFormattedDate(dateInput: number) {
  const _date = moment(dateInput);
  const FORMAT = 'ddd DD MMMM';
  return _date.format(FORMAT)[0].toUpperCase() + _date.format(FORMAT).substr(1);
}

export function getFormattedTime(dateInput: number) {
  const _date = moment(dateInput);
  const FORMAT = 'HH:mm';
  return _date.format(FORMAT);
}
