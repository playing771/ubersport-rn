import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { IJoinGameResult } from './types';
import { fullGameInfoFragment } from '../fragments';

const fragments = `
  ${fullGameInfoFragment}
`;

// TODO: remove redundant data. Return only game ID
export const JOIN_GAME_GQL = gql`
  mutation joinGame($gameId: ID!, $userId: String!) {
    joinGame(gameId: $gameId, userId: $userId) {
      ...fullGameInfoFragment
    }
  }
  ${fragments}
`;

export type JoinGameMutationVariables = {
  gameId: string;
  userId: string;
};

export default class CreateGameMutation extends Mutation<
  IJoinGameResult,
  JoinGameMutationVariables
> {}
