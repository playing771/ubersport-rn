import { ApolloError } from 'apollo-client';

export default function handleApoloError(err: ApolloError) {
  if (err.graphQLErrors) {
    err.graphQLErrors.forEach(gError => {
      console.log(gError.message);
    });
  }
  if (err.networkError && (err.networkError as any).error) {
    (err.networkError as any).result.errors.forEach((error: any) => {
      console.log(error.message);
    });
  }

  if (err.networkError && (err.networkError as any).result) {
    (err.networkError as any).result.errors.forEach((gError: any) => {
      console.log(gError.message);
    });
  } else {
    console.log(err);
  }
}
