import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IGame } from '../../api/games/types';
import IUser from '../../api/user/types';
import ErrorCard from '../../components/ErrorCard';
import Card from '../../components/GeneralCard';
import ULoader from '../../components/ULoader/index';
import useAppContext from '../../hooks/useAppContext';
import GeneralGameInfo from './GeneralInfo';
import useGameInfoQuery from './gql';
import InfoCard from './InfoCard';
import JoinGameBtn from './JoinGameBtn';

export interface IProps {
  id: string;
  onPressEdit: (game: IGame) => void;
  onPressParticipants: () => void;
}

export default function GameDetails({ id, onPressEdit, onPressParticipants }: IProps) {
  const { data, loading, error } = useGameInfoQuery({ id });
  const { user } = useAppContext();

  if (loading) {
    return <ULoader />;
  }
  if (error) {
    return <ErrorCard error={error} />;
  }

  const { game } = data;
  const isParticipant = isParticipantCheck(user.id, game.participants);

  return game ? (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isParticipant && (
          <InfoCard
            onEditBtnPress={() => onPressEdit(game)}
            gameId={game.id}
            isAuthor={isAuthor(user.id, game)}
            style={{ marginTop: 6 }}
          />
        )}
        <Card disabled={true} wrapperStyle={styles.card}>
          <GeneralGameInfo game={game} onPressParticipants={onPressParticipants} />
        </Card>
      </ScrollView>
      {!isParticipant && <JoinGameBtn variables={{ gameId: game.id, userId: user.id }} />}
    </View>
  ) : (
    <ULoader />
  );
}

function isParticipantCheck(userId: string, gameParticipants: IUser[]): boolean {
  return typeof gameParticipants.find(pnt => pnt.id === userId) !== 'undefined';
}

function isAuthor(userId: string, game: IGame) {
  return userId === game.author.id;
}

const cardBackgroundColor = '#ffffff';

const styles = StyleSheet.create({
  mainContainer: { flex: 1, position: 'relative' },

  card: {
    borderRadius: 6,
    backgroundColor: cardBackgroundColor,
    borderColor: '#CCCCCC',
    overflow: 'hidden',
    borderWidth: 0.5,
    flex: 1,
    // paddingBottom: 50,
    // marginBottom: 110,
  },
});
