import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { fullGameInfoFragment } from '../../api/fragments';
import { IGame, ILeaveGameResult } from '../../api/games/types';

// TODO: добавить Participant count в схему

const fragments = `
  ${fullGameInfoFragment}
`;

export const SUBSCRIBE_ONCHANGE_GAME = gql`
  # Write your query or mutation here
  subscription onGameRoomChange($id: String!) {
    onGameRoomUpdate(id: $id) {
      id
      name
      dateEnd
      dateStart
      description
      maxParticipants
      minParticipants
      location {
        coordinates
        address
      }
      participants {
        id
        email
      }
    }
  }
`;

export const GET_GAME_INFO_GQL = gql`
  query getGameInfo($id: ID!) {
    game(id: $id) {
      ...fullGameInfoFragment
    }
  }
  ${fragments}
`;

interface IGameInfoQueryVariables {
  id: string;
}
interface IGameInfoQueryResponse {
  game: IGame;
}

export default function useGameInfoQuery(variables: IGameInfoQueryVariables) {
  return useQuery<IGameInfoQueryResponse, IGameInfoQueryVariables>(GET_GAME_INFO_GQL, {
    variables,
    fetchPolicy: 'cache-and-network',
  });
}

export const LEAVE_GAME_GQL = gql`
  mutation leaveGame($gameId: ID!, $userId: String!) {
    leaveGame(gameId: $gameId, userId: $userId) {
      id
      participants {
        id
        firstName
        lastName
        nickname
      }
    }
  }
`;

export interface ILeaveGameVariables {
  gameId: string;
  userId: string;
}

export function useLeaveGameMutation() {
  return useMutation<ILeaveGameResult, ILeaveGameVariables>(LEAVE_GAME_GQL);
}
