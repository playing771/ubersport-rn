import { useReducer } from 'react';
import { IAgeLimit, ILocation } from '../../../api/games/types';
import { SimpleCallback } from '../../../utils/types';

interface IState {
  dateStart?: number;
  dateEnd?: number;
  location?: ILocation;
  name: string;
  description: string;
  minParticipants?: number;
  maxParticipants?: number;
  ageLimit?: IAgeLimit;
}

export type IEditGameState = IState;

const initialState: IState = {
  dateStart: undefined,
  dateEnd: undefined,
  location: undefined,
  name: '',
  description: '',
  minParticipants: undefined,
  maxParticipants: undefined,
  ageLimit: { min: 0, max: 0 },
};

export function useEditGameForm(gameData: IState = initialState) {
  const [formState, dispatch] = useReducer(reducer, gameData);
  return { formState, dispatch };
}

function reducer(state: IState, action: EditGameActions): IState {
  switch (action.type) {
    case 'editLocation': {
      return { ...state, location: action.payload.location };
    }

    case 'editGameDescription': {
      return { ...state, description: action.payload.gameDescription };
    }

    case 'editGameName': {
      return { ...state, name: action.payload.gameName };
    }

    case 'editMaxParticipants': {
      return { ...state, maxParticipants: action.payload.maxParticipants };
    }

    case 'editMinParticipants': {
      return { ...state, minParticipants: action.payload.minParticipants };
    }

    case 'editTime': {
      action.payload.cbFn();
      return { ...state, dateStart: action.payload.dateStart, dateEnd: action.payload.dateEnd };
    }
    default: {
      console.warn('cant find action');
      return state;
    }
  }
}

export type EditGameActions =
  | {
      type: 'editLocation';
      payload: { location: ILocation };
    }
  | {
      type: 'editTime';
      payload: { dateStart: number; dateEnd: number; cbFn: SimpleCallback };
    }
  | {
      type: 'editMinParticipants';
      payload: { minParticipants: number };
    }
  | {
      type: 'editMaxParticipants';
      payload: { maxParticipants: number };
    }
  | {
      type: 'editGameName';
      payload: { gameName: string };
    }
  | {
      type: 'editGameDescription';
      payload: { gameDescription: string };
    };
