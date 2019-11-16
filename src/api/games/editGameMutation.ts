import gql from 'graphql-tag';
import { IAgeLimit, ILocation } from './types';

// TODO: remove redundant data. Return only game ID
export const EDIT_GAME_GQL = gql`
  mutation editGame($gameInput: GameUpdateInput!) {
    editGame(gameInput: $gameInput) {
      id
    }
  }
`;

export interface EditGameMutationVariables {
  gameInput: {
    id: string;
    name?: string;
    location?: ILocation;
    description?: string;
    maxParticipants?: number;
    minParticipants?: number;
    ageLimit?: IAgeLimit;
    dateEnd?: number;
    dateStart?: number;
  };
}
