import gql from 'graphql-tag';
import { fullGameInfoFragment } from '../fragments';
import { IAgeLimit, ILocation } from './types';

const fragments = `
  ${fullGameInfoFragment}
`;

export const EDIT_GAME_GQL = gql`
  mutation editGame($gameInput: GameUpdateInput!) {
    editGame(gameInput: $gameInput) {
      ...fullGameInfoFragment
    }
  }
  ${fragments}
`;

export interface EditGameMutationVariables {
  gameInput: {
    id: string;
    name: string;
    location: ILocation;
    description?: string;
    maxParticipants?: number;
    minParticipants?: number;
    ageLimit?: IAgeLimit;
    dateEnd: number;
    dateStart: number;
  };
}
