export default function getFormData(uri: string, filename: string | undefined) {
  // Infer the type of the image

  const match = filename ? /\.(\w+)$/.exec(filename) : undefined;
  const type = match ? `image/${match[1]}` : `image`;

  // Upload the image using the fetch and FormData APIs
  const formData = new FormData();
  // uri:
  //       Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '')
  const params: any = { uri, name: filename, type };
  formData.append('file', params);
  return formData;
}
