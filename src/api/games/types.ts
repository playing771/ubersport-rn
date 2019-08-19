import ISport from '../sports/Sport.type';
import IUser from '../user/types';

export interface IParticipant extends IUser {}

export interface IAuthor extends IUser {}

export enum GameStatus {
	Pending = 'PENDING',
	Finished = 'FINISHED'
}

export interface IGetGamesResult {
	games: {
		count: number;
		games: IGame[];
		__typename?: string;
	};
}

export interface IGetActiveUserGamesResult extends IGetGamesResult {}
export interface ICreateGameResult {
	createGame: { id: string };
}

export interface IEditGameResult {
	editGame: { id: string };
}

export interface IJoinGameResult {
	joinGame: IGame;
}

export interface ILeaveGameResult {
	leaveGame: Pick<IGame, 'id' | 'participants'>;
}

export interface IGetParticipantsResult {
	game: {
		participants: IParticipant[];
		author: IAuthor;
	};
}

export interface IGame {
	__typename: string;
	id: string;
	name: string;
	description: string;
	creationDate: number;
	sport: ISport;
	location: ILocation;
	participants: IParticipant[];
	maxParticipants: number;
	minParticipants: number;
	author: IAuthor;
	dateStart: number;
	dateEnd: number;
	status: GameStatus;
	ageLimit: IAgeLimit;
}

type longitude = number;
type latitude = number;
export interface ILocation {
	coordinates: [longitude, latitude];
	address: string;
}

export interface IAgeLimit {
	min: number;
	max: number;
}
