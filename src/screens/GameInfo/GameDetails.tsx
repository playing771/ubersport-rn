import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import withGameInfoQuery from '../../api/games/getGameByIdQuery';
import ULoader from '../../components/ULoader/index';
import GeneralGameInfo from './GeneralInfo';
import Card from '../../components/GeneralCard';
import InfoCard from './InfoCard';
import { AppContext } from '../../other/context/sports';
import { IGame } from '../../api/games/types';
import JoinGameBtn from './JoinGameBtn';
import IUser from '../../api/user/types';
import LeaveGameBtn from './LeaveGameBtn';
import ErrorGqlCard from '../../components/ErrorCard/ErrorGqlCard';

export type IGameDetailsProps = {
  id: string;
  ctx: AppContext;
  onPressEdit: (game: IGame) => void;
  onPressParticipants: () => void;
};

const GameDetails = withGameInfoQuery(
  ({ data: { loading, game, error }, ctx, onPressEdit, onPressParticipants }) => {
    if (loading) {
      return <ULoader />;
    }
    if (error) {
      return <ErrorGqlCard error={error}></ErrorGqlCard>;
    }
    return game ? (
      <View style={styles.mainContainer}>
        {isAuthor(ctx.user.id, game) && <InfoCard onPressEditBtn={() => onPressEdit(game)} />}
        <Card disabled={true} wrapperStyle={styles.card}>
          <GeneralGameInfo game={game} onPressParticipants={onPressParticipants} />
        </Card>
        {!isParticipant(ctx.user.id, game.participants) ? (
          <JoinGameBtn variables={{ gameId: game.id, userId: ctx.user.id }} />
        ) : (
          <LeaveGameBtn variables={{ gameId: game.id, userId: ctx.user.id }} />
        )}
      </View>
    ) : (
      <ULoader />
    );
  }
);

function isParticipant(userId: string, gameParticipants: IUser[]): boolean {
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
    marginBottom: 110,
  },
});

export default GameDetails;
