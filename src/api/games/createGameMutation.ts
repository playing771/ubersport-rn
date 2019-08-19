import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ILocation, IAgeLimit, ICreateGameResult } from './types';

// TODO: remove redundant data. Return only game ID
export const CREATE_GAME_GQL = gql`
	mutation createGame(
		$name: String!
		$location: LocationInput
		$description: String
		$maxParticipants: Float
		$minParticipants: Float
		$ageLimit: AgeLimitInput
		$sportId: Float!
		$dateStart: Float!
		$dateEnd: Float
		$authorId: String
	) {
		createGame(
			gameInput: {
				name: $name
				location: $location
				description: $description
				maxParticipants: $maxParticipants
				minParticipants: $minParticipants
				ageLimit: $ageLimit
				sportId: $sportId
				dateStart: $dateStart
				dateEnd: $dateEnd
				authorId: $authorId
			}
		) {
			id
		}
	}
`;

export type CreateGameMutationVariables = {
	name: string;
	location: ILocation;
	description: string;
	minParticipants?: number;
	maxParticipants?: number;
	ageLimit?: IAgeLimit;
	sportId: number;
	dateStart: number;
	dateEnd: number;
	authorId: string;
};

export default class CreateGameMutation extends Mutation<
	ICreateGameResult,
	CreateGameMutationVariables
> {}
