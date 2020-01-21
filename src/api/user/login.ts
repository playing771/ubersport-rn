import IUser, { SocialAuth } from './types';
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

export async function login(email: string, password: string): Promise<IAuthResult> {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const { user, accessToken } = await response.json();

    return { user, accessToken };
  } catch (error) {
    throw error;
  }
}

export async function socialLogin(
  email: string | null,
  external: SocialAuth,
  idToken: string,
  meta = {}
): Promise<IAuthResult> {
  try {
    const response = await fetch(`${BASE_URL}/auth/social/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        external,
        idToken,
        meta,
      }),
    });

    const { user, accessToken } = await response.json();

    return { user, accessToken };
  } catch (error) {
    throw error;
  }
}
