import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { IGame } from '../../api/games/types';
import ErrorCard from '../../components/ErrorCard';
import GameDetailsCard from '../../components/GameCard';
import { HEADER_BACKGROUND } from '../../constants/Colors';
import { BASE_PADDING } from '../../sharedStyles';
import { IFindGameFilters, ISearchGameSort } from '../FindGame';
import useGamesListQuery from './gql';

const keyExtractor = (item: IGame) => item.id;

export interface IProps {
  onGameCardPress: (gameId: string) => void;
  filters: IFindGameFilters;
  sort: ISearchGameSort;
}

export function GamesList({ onGameCardPress, filters, sort }: IProps) {
  const { data, loading, error, refetch } = useGamesListQuery({ filters, sort });

  if (error) {
    return <ErrorCard error={error} />;
  }

  if (!data || !data.games) {
    return null;
  }

  const renderGameItem = ({ item }: { item: IGame }) => (
    <GameDetailsCard game={item} simple={true} style={styles.card} onPress={onGameCardPress} />
  );

  return (
    <FlatList
      data={data.games.games}
      contentContainerStyle={styles.listContainer}
      keyExtractor={keyExtractor}
      renderItem={renderGameItem}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} tintColor={HEADER_BACKGROUND} />
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: { paddingBottom: BASE_PADDING },
  card: { marginBottom: 8, borderBottomColor: '#9B9B9B' },
});
