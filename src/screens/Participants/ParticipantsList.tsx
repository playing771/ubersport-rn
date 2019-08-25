import React from 'react';
import { ScrollView, FlatList, Text, StyleSheet } from 'react-native';
import ULoader from '../../components/ULoader/index';
import { IParticipant, IGame } from '../../api/games/types';
import { AppContextConsumer } from '../../other/context/sports';
import Participant from './Participant';
import withParticipantsQuery from '../../api/games/getParticipantsQuery';

export interface IParticipantsListProps {
  gameId: string;
}

export interface IParticipantWithAuthorState extends IParticipant {
  isAuthor: boolean;
  gameId: string;
}

const ParticipantItem = ({ item }: { item: IParticipantWithAuthorState }) => (
  <Participant {...item} />
);

const keyExtractor = (item: IParticipantWithAuthorState) => item.id;

const ParticipantsList = withParticipantsQuery(({ data: { loading, error, game }, gameId }) => {
  if (loading || !game) {
    return <ULoader />;
  }

  if (error) {
    return <Text>ERROR</Text>;
  }
  return (
    game && (
      <AppContextConsumer>
        {ctx => (
          <ScrollView style={styles.container}>
            <FlatList
              style={styles.list}
              data={getParticipantsWithAuthorState(
                game.participants,
                game.author.id,
                ctx.user.id,
                gameId
              )}
              renderItem={ParticipantItem}
              keyExtractor={keyExtractor}
            />
          </ScrollView>
        )}
      </AppContextConsumer>
    )
  );
});

export default ParticipantsList;

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
  container: { paddingTop: 20 },
  list: { paddingTop: 20 },
});
