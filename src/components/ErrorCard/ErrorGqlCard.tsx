import { ApolloError } from 'apollo-client';
import React from 'react';
import handleApoloError from '../../utils/handleApoloError';
import ErrorCard, { IErrorCardProps } from './index';

interface IProps extends Omit<IErrorCardProps, 'error'> {
  error?: ApolloError;
}

export default function ErrorGqlCard({ error, ...errorCardProps }: IProps) {
  return error ? <ErrorCard error={handleApoloError(error)} {...errorCardProps} /> : null;
}
