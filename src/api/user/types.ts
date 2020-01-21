import ISport from '../sports/Sport.type';
import { ILocation } from '../games/types';

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
  avatar: string | null;
  location: ILocation;
}

export type SocialAuth = 'GOOGLE' | 'FACEBOOK' | 'APPLE';
export interface IUserWithToken extends IUser {
  token: string;
}
