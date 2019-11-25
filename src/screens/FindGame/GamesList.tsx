import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { IGame } from '../../api/games/types';
import ErrorCard from '../../components/ErrorCard';
import GameDetailsCard from '../../components/GameCard';
import Colors from '../../constants/Colors';
import { BASE_PADDING } from '../../sharedStyles';
import { IFindGameFilters, ISearchGameSort } from '../FindGame';
import useGamesListQuery from './gql';

const keyExtractor = (item: IGame) => item.id;

const PAGE_SIZE = 4;
export interface IProps {
  onGameCardPress: (gameId: string) => void;
  filters: IFindGameFilters;
  sort: ISearchGameSort;
}

export function GamesList({ onGameCardPress, filters, sort }: IProps) {
  const { data, loading, error, refetch, fetchMore } = useGamesListQuery({
    filters,
    sort,
    // page: { pageNumber: 0, pageSize: PAGE_SIZE },
  });

  if (error) {
    return <ErrorCard error={error} />;
  }

  if (!data) {
    return null;
  }

  // console.log('data.games', data.games);

  const { games, count } = data.games;

  console.log('NEW games');

  const renderGameItem = ({ item }: { item: IGame }) => (
    <GameDetailsCard game={item} simple={true} style={styles.card} onPress={onGameCardPress} />
  );

  return (
    <>
      {/* <Text>COUNT {count}</Text> */}
      <FlatList
        data={games}
        contentContainerStyle={styles.listContainer}
        keyExtractor={keyExtractor}
        renderItem={renderGameItem}
        showsVerticalScrollIndicator={false}
        // onEndReached={() => {
        //   console.log('onEndReached');

        //   const objvariables = {
        //     filters,
        //     sort,
        //     page: {
        //       pageNumber: 1,
        //       pageSize: PAGE_SIZE,
        //     },
        //   };
        //   // console.log('objvariables', objvariables);

        //   fetchMore({
        //     variables: objvariables,
        //     updateQuery: (prev: IGamesListResult, { fetchMoreResult, variables }) => {
        //       // console.log('fetchMoreResult', fetchMoreResult);
        //       console.log('variables', variables);

        //       if (!fetchMoreResult) {
        //         return prev;
        //       }

        //       // prev.games.
        //       const newGames = [...prev.games.games, ...fetchMoreResult.games.games];

        //       const newResult = { ...prev };
        //       newResult.games.games = newGames;
        //       // const newResult = Object.assign({}, prev, );
        //       console.log('newresult', newResult.games.games.length);

        //       return newResult;
        //     },
        //   });
        // }}
        // onEndReachedThreshold={0}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} tintColor={Colors.purle} />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#F9F9FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    paddingBottom: BASE_PADDING,
  },
  card: { marginBottom: 12, borderBottomColor: '#9B9B9B' },
});
