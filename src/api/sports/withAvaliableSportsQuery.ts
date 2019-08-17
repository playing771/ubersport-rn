import { Query, ChildDataProps, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { sportFragment } from '../fragments';
import ISport from './Sport.type';
import { ISportsFilterListProps } from '../../components/SportsList';

const fragments = `
  ${sportFragment}
`;

export const GET_SPORTS_GQL = gql`
  query getAvaliableSports {
    sports {
      ...sportFragment
    }
  }
  ${fragments}
`;

export interface IGetSportsResult {
  sports: ISport[];
}

interface IVariables {}

interface IInputProps extends IVariables, ISportsFilterListProps {}

export class SportsQuery extends Query<IGetSportsResult, IVariables> {}

export type WithAvaliableSportsProps = ChildDataProps<
  IInputProps,
  IGetSportsResult,
  IVariables
>;

const withAvaliableSportsQuery = graphql<
  IInputProps,
  Response,
  IVariables,
  WithAvaliableSportsProps
>(GET_SPORTS_GQL);

export default withAvaliableSportsQuery;
