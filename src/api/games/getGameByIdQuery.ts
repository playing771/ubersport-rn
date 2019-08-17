import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { IGame } from './types';
import { fullGameInfoFragment } from '../fragments';
import { ChildDataProps, graphql } from 'react-apollo';
import { NavigationInjectedProps } from 'react-navigation';
import { AppContext } from '../../other/context/sports';
import { IGameDetailsProps } from '../../screens/GameInfo/GameDetails';

// TODO: добавить Participant count в схему

const fragments = `
  ${fullGameInfoFragment}
`;

export const GET_GAME_INFO_GQL = gql`
  query getGameInfo($id: ID!) {
    game(id: $id) {
      ...fullGameInfoFragment
    }
  }
  ${fragments}
`;

interface GetGameInfoQueryVariables {
  id: string;
}

export class GameInfoQuery extends Query<Response, GetGameInfoQueryVariables> {}

type Response = { game: IGame };

// type InputProps = {
//   id: string;
//   ctx: AppContext;
// };

type Variables = {
  id: string;
};

export type GetGameByIdChildProps = ChildDataProps<
  IGameDetailsProps,
  Response,
  Variables
>;

const withGameInfoQuery = graphql<
  IGameDetailsProps,
  Response,
  Variables,
  GetGameByIdChildProps
>(GET_GAME_INFO_GQL, {
  options: ({ id }) => ({
    variables: { id }
  })
});

export default withGameInfoQuery;
