import { BASE_URL } from '../../constants/Api';

async function uploadAvatar(body: any, auth: string): Promise<any> {
  const response = await fetch(`${BASE_URL}/file/upload/avatar`, {
    method: 'POST',
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${auth}`,
    },
  });
  let responseJson = await response.json();

  return responseJson;
}

export default uploadAvatar;
