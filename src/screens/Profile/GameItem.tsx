import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { IGame } from '../../api/games/types';
import { SportCard } from '../../components/SportCard/index';
import dateToString from '../../utils/toDateString';

interface IProps {
  game: IGame;
  onCardPress: (gameId: string) => void;
  style?: ViewStyle;
}

const GameItem = ({ game, onCardPress, style }: IProps) => {
  return (
    <View style={style}>
      <Text style={styles.date}>{dateToString(game.creationDate)}</Text>
      <SportCard
        sport={{ ...game.sport }}
        style={styles.sportCard}
        textStyle={{ color: '#CFD5DE' }}
        iconColor="#CFD5DE"
        title={game.name}
        onPress={() => onCardPress(game.id)}
      />
      <View style={styles.gameInfoContainer}>
        {/* <View style={styles.authorInfoContainer}>
          <UserAvatar src={game.author.avatar} size={24} />
          <Text style={styles.nickname}>{game.author.nickname}</Text>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  sportCard: {
    width: 150,
    minHeight: 80,
    marginRight: 10,
    // backgroundColor: "#51A9FF",
    backgroundColor: 'white',
  },
  gameInfoContainer: { paddingVertical: 10, paddingHorizontal: 2 },
  authorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 5,
  },
  nickname: {
    paddingLeft: 5,
    color: '#A4AECB',
    fontWeight: '500',
    fontSize: 12,
    alignSelf: 'center',
  },
  date: {
    color: '#A4AECB',
    textAlign: 'center',
    fontSize: 12,
    paddingBottom: 10,
    fontWeight: '700',
  },
});

export default GameItem;
