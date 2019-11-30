import moment, { Moment } from 'moment';
import { getFormattedTime } from '../../../../utils/dateUtils';

const DEFAULT_GAME_LENGTH = 2; // 2h
const DEFAULT_NEW_GAME_TIMEOUT = 15; // 15 minutes

export function getInitialStartingTime() {
  return roundNext15Minutes(moment()).valueOf();
}

export function getInittalEndingTime(dateStart: number) {
  return moment(dateStart)
    .add(DEFAULT_GAME_LENGTH, 'h')
    .valueOf();
}

export function roundNext15Minutes(dateToRound: Moment) {
  const newDate = dateToRound.clone();
  let intervals = Math.floor(newDate.minutes() / DEFAULT_NEW_GAME_TIMEOUT);
  if (newDate.minutes() % DEFAULT_NEW_GAME_TIMEOUT !== 0) {
    intervals++;
  }
  if (intervals === 60 / DEFAULT_NEW_GAME_TIMEOUT) {
    newDate.add(1, 'h');
    intervals = 0;
  }
  newDate.minutes(intervals * DEFAULT_NEW_GAME_TIMEOUT);
  newDate.seconds(0);
  return newDate;
}

export function getGameLength(dateStart: number, dateEnd: number) {
  return (
    moment(dateEnd)
      .diff(moment(dateStart), 'hours')
      .toLocaleString() + ' h'
  );
}

export function getTimeLable(dateStart: number, dateEnd: number) {
  return getFormattedTime(dateStart) + ' - ' + getFormattedTime(dateEnd);
}
