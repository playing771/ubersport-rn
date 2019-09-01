import React from 'react';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import GameItem from './GameItem';
import { GameStatus } from '../../api/games/types';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { BOTTOM_BIG_NOTCH } from '../../components/AdaptiveScreen/index';
import useGamesListQuery from '../FindGame/gql';
import ErrorGqlCard from '../../components/ErrorCard/ErrorGqlCard';
import ULoader from '../../components/ULoader';
import { PADDING_VALUE } from '../../sharedStyles';

interface IProps {
  userId: string;
  onGamePress: (gameId: string) => void;
  status: GameStatus;
  title: string;
  emptyText: string;
}

const ProfileGamesList = ({ userId, onGamePress, status, title, emptyText }: IProps) => {
  const { data, error, loading } = useGamesListQuery({ participantsIds: [userId], status });

  if (error) {
    return <ErrorGqlCard error={error} />;
  }

  if (loading) {
    return <ULoader />;
  }

  const { games } = data.games;

  const renderItem = ({ item, index }) => (
    <GameItem
      game={item}
      onCardPress={onGamePress}
      style={
        // добавлям падинг первому и последнему элементу в списке
        index === 0
          ? { marginLeft: PADDING_VALUE }
          : index === games.length - 1
          ? { marginRight: PADDING_VALUE }
          : undefined
      }
    />
  );

  return (
    <>
      <Text style={styles.header}>{title}</Text>
      <View style={styles.container}>
        {games.length ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              isIphoneX() ? { paddingBottom: BOTTOM_BIG_NOTCH + 25 } : undefined
            }
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
