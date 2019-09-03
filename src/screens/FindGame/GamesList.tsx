import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import GameDetailsCard from '../../components/GameCard';

import ULoader from '../../components/ULoader/index';
import { IGame } from '../../api/games/types';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { BOTTOM_BIG_NOTCH } from '../../components/AdaptiveScreen/index';

import ErrorGqlCard from '../../components/ErrorCard/ErrorGqlCard';
import useGamesListQuery from './gql';
import { IFindGameFilters, ISearchGameSort } from '../FindGame';

const keyExtractor = (item: IGame) => item.id;

export interface IProps {
  onGameCardPress: (gameId: string) => void;
  filters: IFindGameFilters;
  sort: ISearchGameSort;
}

const GamesList = ({ onGameCardPress, filters, sort }: IProps) => {
  console.log(sort, 'SORT');

  const { data, loading, error } = useGamesListQuery({ filters, sort });

  if (loading) {
    return <ULoader />;
  }

  if (error) {
    return <ErrorGqlCard error={error} />;
  }
  return (
    data.games && (
      <FlatList
        data={data.games.games}
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
};

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
