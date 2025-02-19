import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { IParticipant } from '../../api/games/types';
import ErrorCard from '../../components/ErrorCard';
import ULoader from '../../components/ULoader/index';
import useAppContext from '../../hooks/useAppContext';
import { BASE_PADDING } from '../../sharedStyles';
import { useGetParticipantsQuery } from './gql';
import { Participant } from './Participant';

interface IProps {
  gameId: string;
}

export interface IParticipantWithAuthorState extends IParticipant {
  isAuthor: boolean;
  gameId: string;
}

const keyExtractor = (item: IParticipantWithAuthorState) => item.id;

export function ParticipantsList(props: IProps) {
  const { data, loading, error } = useGetParticipantsQuery({ id: props.gameId });
  const { user } = useAppContext();

  if (error) {
    return <ErrorCard error={error} />;
  }

  if (loading) {
    return <ULoader />;
  }

  if (!data) {
    return null;
  }

  const { participants, author } = data.game;
  const { gameId } = props;

  function ParticipantItem({ item }: { item: IParticipantWithAuthorState }) {
    return <Participant {...item} authorId={author.id} />;
  }

  return (
    <FlatList
      data={getParticipantsWithAuthorState(participants, author.id, user.id, gameId)}
      scrollEnabled={false}
      contentContainerStyle={styles.list}
      renderItem={ParticipantItem}
      keyExtractor={keyExtractor}
    />
  );
}

// добавляет в данные с участником gameIdd и userId
function getParticipantsWithAuthorState(
  participants: IParticipant[],
  authorId: string,
  userId: string,
  gameId: string
) {
  return participants.map(participant => {
    const participantWithAuthorState: IParticipantWithAuthorState = {
      ...participant,
      isAuthor: authorId === userId,
      gameId,
    };
    return participantWithAuthorState;
  });
}

const styles = StyleSheet.create({
  list: { paddingTop: BASE_PADDING / 2 },
});
