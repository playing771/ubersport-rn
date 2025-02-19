import { BASE_URL } from '../../constants/Api';

export interface IExistEmail {
  email: string;
  isExist: boolean;
}

async function emailValidate(email: string): Promise<IExistEmail> {
  const response = await fetch(`${BASE_URL}/auth/email`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      // email: 'maxpayne7@yandex.ru',
      // password: '123'
    }),
  });
  let responseJson = await response.json();

  return responseJson;
}

export default emailValidate;
