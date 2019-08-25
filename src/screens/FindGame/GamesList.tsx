import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import GameDetailsCard from '../../components/GameCard';
import withGamesQuery from '../../api/games/getGamesQuery';
import ULoader from '../../components/ULoader/index';
import { IGame } from '../../api/games/types';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { BOTTOM_BIG_NOTCH } from '../../components/AdaptiveScreen/index';
import handleApoloError from '../../other/handleApoloError';
import ErrorGqlCard from '../../components/ErrorCard/ErrorGqlCard';

const keyExtractor = (item: IGame) => item.id;

export interface IGamesListProps {
  onGameCardPress: (gameId: string) => void;
}

const GamesList = withGamesQuery(
  ({ data: { loading, error, games = { games: [] } }, onGameCardPress }) => {
    if (loading) {
      return <ULoader />;
    }

    if (error) {
      return <ErrorGqlCard error={error}></ErrorGqlCard>;
    }
    return (
      games && (
        <FlatList
          data={games.games}
          // extraData={data!.getGames.games}
          // style={{ marginBottom: 120 }}
          contentContainerStyle={isIphoneX() ? { paddingBottom: BOTTOM_BIG_NOTCH + 25 } : undefined}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => {
            return (
              <GameDetailsCard
                game={item}
                simple={true}
                style={styles.card}
                onPress={onGameCardPress}
              />
            );
          }}
        />
      )
    );
  }
);

const styles = StyleSheet.create({
  mainContainer: {},
  listContainer: {
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  card: { marginBottom: 8, borderBottomColor: '#9B9B9B' },
});

export default GamesList;
