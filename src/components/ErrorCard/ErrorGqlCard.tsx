import React from 'react';
import ErrorCard, { IErrorCardProps } from './index';
import { ApolloError } from 'apollo-client';
import handleApoloError from '../../utils/handleApoloError';

interface IProps extends Omit<IErrorCardProps, 'error'> {
  error?: ApolloError;
}

export default function ErrorGqlCard({ error, ...errorCardProps }: IProps) {
  return error ? <ErrorCard error={handleApoloError(error)} {...errorCardProps} /> : null;
}
