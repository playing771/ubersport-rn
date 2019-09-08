import { ApolloError } from 'apollo-client';

/**
 *  из объекта ApolloError достает текст ошибки
 * @param {ApolloError} err
 * @returns {string}
 */
export default function handleApoloError(err: ApolloError): string {
  let errString: string = '';
  if (err.graphQLErrors) {
    err.graphQLErrors.forEach(gError => {
      if (typeof gError.message === 'object') {
        errString += gError.message.error + ' ' + gError.message.statusCode;
      } else {
        errString += gError.message;
      }

      // console.warn(gError.message);
    });
  }
  if (err.networkError && (err.networkError as any).error) {
    (err.networkError as any).result.errors.forEach((error: any) => {
      errString += error.message;

      // console.warn(error.message);
    });
  }

  if (err.networkError && (err.networkError as any).result) {
    (err.networkError as any).result.errors.forEach((gError: any) => {
      errString += gError.message;

      // console.warn(gError.message);
    });
  } else {
    // console.warn(err);
  }
  // console.log('err',err);

  return errString;
}
