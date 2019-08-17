import ISport from '../sports/Sport.type';

export type ISex = 'MALE' | 'FEMALE';
export default interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  middleName: string;
  dateOfBirth: number;
  favoriteSports: ISport[];
  sex: ISex;
}

export interface IUserWithToken extends IUser {
  token: string;
}
