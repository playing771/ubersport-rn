import IUser from './types';
import { Omit } from 'react-navigation';
import { BASE_URL } from '../../constants/Api';

interface IUserResult extends Omit<IUser, 'id'> {
  _id: string;
}
export interface IAuthResult {
  // TODO: tmp!
  accessToken: string;
  user: IUserResult;
}

async function login(email: string, password: string): Promise<IAuthResult> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      // email: 'maxpayne7@yandex.ru',
      // password: '123'
    }),
  });
  let responseJson = await response.json();

  const { user, accessToken } = responseJson;

  return { user, accessToken };
}

export default login;
