import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { GameStatus, IGame } from '../../api/games/types';
import ErrorCard from '../../components/ErrorCard';
import ULoader from '../../components/ULoader';
import { BASE_PADDING } from '../../sharedStyles';
import useGamesListQuery from '../FindGame/gql';
import GameItem from './GameItem';

interface IProps {
  userId: string;
  onGamePress: (gameId: string) => void;
  status: GameStatus;
  title: string;
  emptyText: string;
}

const ProfileGamesList = ({ userId, onGamePress, status, title, emptyText }: IProps) => {
  const { data, error, loading } = useGamesListQuery({
    filters: { participantsIds: [userId], status },
    sort: 'date',
  });

  if (error) {
    return <ErrorCard error={error} />;
  }

  if (loading) {
    return <ULoader />;
  }

  const games = data ? data.games.games : [];

  const renderItem = ({ item, index }: { item: IGame; index: number }) => (
    <GameItem
      game={item}
      onCardPress={onGamePress}
      style={
        // добавлям падинг первому и последнему элементу в списке
        index === 0
          ? { marginLeft: BASE_PADDING }
          : index === games.length - 1
          ? { marginRight: BASE_PADDING }
          : undefined
      }
    />
  );

  return (
    <>
      <Text style={styles.header}>{title}</Text>
      <View style={styles.container}>
        {games.length ? (
          <FlatList<IGame>
            showsHorizontalScrollIndicator={false}
            data={games}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        ) : (
          <Text style={styles.emptyText}>{emptyText}</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyText: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#9CA0AC',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default ProfileGamesList;
