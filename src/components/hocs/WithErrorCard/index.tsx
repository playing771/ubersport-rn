import { ApolloError } from 'apollo-client';
import React from 'react';
import ErrorCard from '../../ErrorCard';

interface IInjectedProps {
  error?: string | ApolloError;
}

export default function withErrorCard<P>(WrappingComponent: React.ComponentType<P>) {
  const displayName = WrappingComponent.displayName || WrappingComponent.name || 'Component';

  function ComponentWithErrorCard({ error, ...props }: P & IInjectedProps) {
    return (
      <>
        <ErrorCard error={error} />
        <WrappingComponent {...(props as P)} />
      </>
    );
  }

  ComponentWithErrorCard.displayNme = displayName;

  return ComponentWithErrorCard;
}
