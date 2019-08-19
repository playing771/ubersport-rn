import { Query, ChildDataProps, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { IGetGamesResult, GameStatus } from './types';
import { fullGameInfoFragment } from '../fragments';
import { IGamesListProps } from '../../screens/FindGame/GamesList';

// TODO: добавить Participant count в схему

const fragments = `
  ${fullGameInfoFragment}
`;
export const GET_GAMES_GQL = gql`
	query getGamesWithFilters(
		$sportIds: [String]
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

interface GetGamesQueryVariables {
	sportIds?: number[];
	authorId?: string;
	status?: GameStatus;
	participantsIds?: string[];
}

interface InputProps extends Variables, IGamesListProps {}

type Variables = {
	// sportId: String;
	// authorId: String;
	status: GameStatus;
	// participantsIds: string[];
};

export type GetGameByIdChildProps = ChildDataProps<
	InputProps,
	IGetGamesResult,
	Variables
>;

export class GamesQuery extends Query<
	IGetGamesResult,
	GetGamesQueryVariables
> {}

const withGamesQuery = graphql<
	InputProps,
	Response,
	Variables,
	GetGameByIdChildProps
>(GET_GAMES_GQL, {
	options: ({ status }) => ({
		variables: { status }
	})
});

export default withGamesQuery;
