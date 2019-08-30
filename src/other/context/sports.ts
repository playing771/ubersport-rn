import React, { createContext } from 'react';
import ISport from '../../api/sports/Sport.type';
import { IUserWithToken } from '../../api/user/types';

export const uknonwUser: IUserWithToken = {
  id: 'noId',
  nickname: 'uknown',
  token: '',
  lastName: 'uknown',
  dateOfBirth: 123,
  favoriteSports: [],
  firstName: 'uknown',
  middleName: 'unknown',
  sex: 'MALE',
  avatar: null,
};
export interface IAppContextInjectedProp {
  ctx: AppContext;
}
export interface AppContext {
  // sports: { [key: string]: ISport };
  user: IUserWithToken;
  setUser: (user: IUserWithToken) => void;
}

const ctx: AppContext = {
  // sports: {},
  user: uknonwUser,
  setUser: () => undefined,
  // user: {
  //   id: '',
  //   // TODO: favourite sports must be quered from server!
  //   favoriteSports: []
  // }s
};

export const AppContext = createContext<AppContext>(ctx);

export const AppContextProvider = AppContext.Provider;

export const AppContextConsumer = AppContext.Consumer;
