import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ILocation, IAgeLimit, IEditGameResult } from "./types";

// TODO: remove redundant data. Return only game ID
export const EDIT_GAME_GQL = gql`
  mutation editGame($gameInput: GameInput!) {
    editGame(gameInput: $gameInput) {
      id
    }
  }
`;

export type EditGameMutationVariables = {
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
    authorId?: string;
    sportId: string;
  };
};

export default class EditGameMutation extends Mutation<
  IEditGameResult,
  EditGameMutationVariables
> {}
