import React from 'react';
import { StyleSheet, View } from 'react-native';

import ULoader from '../../components/ULoader/index';
import GeneralGameInfo from './GeneralInfo';
import Card from '../../components/GeneralCard';
import InfoCard from './InfoCard';
import { IGame } from '../../api/games/types';
import JoinGameBtn from './JoinGameBtn';
import IUser from '../../api/user/types';
import ErrorGqlCard from '../../components/ErrorCard/ErrorGqlCard';
import useGameInfoQuery from './gql';
import useAppContext from '../../hooks/useAppContext';
import UButton from '../../components/UButton';

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
    return <ErrorGqlCard error={error} />;
  }

  const { game } = data;
  const isParticipant = isParticipantCheck(user.id, game.participants);

  return game ? (
    <View style={styles.mainContainer}>
      {isParticipant && (
        <InfoCard
          onEditBtnPress={() => onPressEdit(game)}
          gameId={game.id}
          isAuthor={isAuthor(user.id, game)}
        />
      )}
      <Card disabled={true} wrapperStyle={styles.card}>
        <GeneralGameInfo game={game} onPressParticipants={onPressParticipants} />
      </Card>
      {/* <UButton title="Присоединиться"></UButton> */}
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
