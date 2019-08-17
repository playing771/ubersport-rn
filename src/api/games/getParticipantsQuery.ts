import { Query, ChildDataProps, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { IGetParticipantsResult } from './types';
import { IParticipantsListProps } from '../../screens/Participants/ParticipantsList';

// TODO: добавить Participant count в схему

export const GET_PARTICIPANTS_GQL = gql`
  query GetParticipants($gameId: ID!) {
    game(id: $gameId) {
      participants {
        id
        firstName
        lastName
        nickname
        dateOfBirth
      }
      author {
        id
        firstName
        lastName
        nickname
        dateOfBirth
      }
    }
  }
`;

interface IGetParticipantsVariables {
  id: string;
}

type Variables = {
  gameId: string;
};

interface InputProps extends Variables, IParticipantsListProps {}

export type GetParticipantsChildProps = ChildDataProps<
  InputProps,
  IGetParticipantsResult,
  Variables
>;

export class ParticipantsQuery extends Query<
  IGetParticipantsResult,
  IGetParticipantsVariables
> {}

const withParticipantsQuery = graphql<
  InputProps,
  Response,
  Variables,
  GetParticipantsChildProps
>(GET_PARTICIPANTS_GQL, {
  options: ({ gameId }) => ({
    variables: { gameId }
  })
});

export default withParticipantsQuery;
