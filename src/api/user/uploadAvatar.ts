async function uploadAvatar(body: any, auth: string): Promise<any> {
  console.log('auth', auth);

  console.log('body', body);

  const response = await fetch('https://ubersport.ru/file/upload/avatar', {
    method: 'POST',
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${auth}`
    }
  });
  let responseJson = await response.json();

  return responseJson;
}

export default uploadAvatar;
