import Mom, { Moment } from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Mom);
moment.locale('ru');

export default function getRangeOfDates(days: number) {
  const now = moment().startOf('d');
  const start = now.clone();
  const end = now.add(days, 'day');

  return Array.from(
    moment()
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
