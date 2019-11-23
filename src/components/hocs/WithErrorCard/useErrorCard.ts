import { ApolloError } from 'apollo-client';
import { useState } from 'react';

export function useErrorCard() {
  const [error, setError] = useState<ApolloError>();

  function handleError(err: ApolloError) {
    return setError(err);
  }

  return { error, toggleErrorCard: handleError };
}
