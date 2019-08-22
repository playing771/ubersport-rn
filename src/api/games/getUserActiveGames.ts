import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { IGetActiveUserGamesResult, GameStatus } from './types';
import { fullGameInfoFragment } from '../fragments';

// TODO: добавить Participant count в схему
const fragments = `
${fullGameInfoFragment}`;

export const GET_USER_ACTIVE_GAMES_GQL = gql`
  query getUserActiveGames(
    $sportIds: [Float]
    $authorId: String
    $status: GameStatus
    $participantsIds: [String!]
  ) {
    games(
      filters: {
        sportIds: $sportIds
        authorId: $authorId
        status: $status
        participantsIds: $participantsIds
      }
    ) {
      count
      games {
        ...fullGameInfoFragment
      }
    }
  }
  ${fragments}
`;

interface IGetUserActiveGamesVariables {
  sportIds?: number[];
  authorId?: string;
  status?: GameStatus;
  participantsIds?: Array<string>;
}

export default class GamesQuery extends Query<
  IGetActiveUserGamesResult,
  IGetUserActiveGamesVariables
> {}
