import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { sportFragment } from '../fragments';
import ISport from './Sport.type';

const fragments = `
  ${sportFragment}
`;

export const GET_AVALIABLE_SPORTS_QUERY = gql`
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

export default function useAvaliableSportsQuery() {
  return useQuery<IGetSportsResult>(GET_AVALIABLE_SPORTS_QUERY);
}

// export type WithAvaliableSportsProps = ChildDataProps<
// //   IInputProps,
// //   IGetSportsResult,
// //   IVariables
// // >;

// // const withAvaliableSportsQuery = graphql<
// //   IInputProps,
// //   Response,
// //   IVariables,
// //   WithAvaliableSportsProps
// // >(GET_SPORTS_GQL);

// // export default withAvaliableSportsQuery;
