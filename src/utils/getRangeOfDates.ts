import Mom, { Moment } from 'moment';
import { extendMoment } from 'moment-range';

export default function getRangeOfDates(days: number) {
  const _moment = extendMoment(Mom);
  _moment.locale('ru');
  const start = _moment();
  const end = _moment().add(days, 'day');

  return Array.from(
    _moment()
      .range(start, end)
      .by('day')
  ).map((date: Moment, index: number) => {
    const _date =
      date.format('dddd, MMM D')[0].toUpperCase() + date.format('dddd, MMM D').substr(1);

    const day = { label: _date, value: date.valueOf() };
    if (index === 0) {
      day.label = 'Сегодня';
    }
    if (index === 1) {
      day.label = 'Завтра';
    }
    return day;
  });
}
