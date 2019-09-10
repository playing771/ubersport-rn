import getAgeFromBirthday from '../../../utils/getAgeFromBirthday';

export function getUserAge(birthday?: number): string {
  let age: string;
  if (typeof birthday === 'undefined') {
    age = 'Возраст неизвестен';
  } else {
    age = getAgeFromBirthday(birthday) + ' Лет';
  }
  return age;
}

export function getFullName(lastName: string = '', firstName: string = ''): string {
  const short: string = lastName ? lastName[0] : '';
  return `${firstName} ${short}`;
}
