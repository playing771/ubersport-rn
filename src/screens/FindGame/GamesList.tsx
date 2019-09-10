import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import GameDetailsCard from '../../components/GameCard';
import ULoader from '../../components/ULoader/index';
import { IGame } from '../../api/games/types';
import ErrorGqlCard from '../../components/ErrorCard/ErrorGqlCard';
import useGamesListQuery from './gql';
import { IFindGameFilters, ISearchGameSort } from '../FindGame';
import { BASE_PADDING } from '../../sharedStyles';

const keyExtractor = (item: IGame) => item.id;

export interface IProps {
  onGameCardPress: (gameId: string) => void;
  filters: IFindGameFilters;
  sort: ISearchGameSort;
}

const GamesList = ({ onGameCardPress, filters, sort }: IProps) => {
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
        contentContainerStyle={styles.listContainer}
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
  listContainer: { paddingBottom: BASE_PADDING },
  card: { marginBottom: 8, borderBottomColor: '#9B9B9B' },
});

export default GamesList;
