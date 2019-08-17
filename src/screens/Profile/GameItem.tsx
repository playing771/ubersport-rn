import * as React from 'react';
import SportCard from '../../components/SportCard/index';
import { Text, StyleSheet, View } from 'react-native';
import UserAvatar from '../../components/AvatarsGroup/UserAvatar';
import getRandomUser from '../../other/getRandomUser';
import { IGame } from '../../api/games/types';
import dateToString from '../../other/toDateString';

interface Props {
  game: IGame;
  onCardPress: (gameId: string) => void;
}

const GameItem: React.FC<Props> = ({ game, onCardPress }) => {
  return (
    <View>
      <Text
        style={{
          color: '#A4AECB',
          textAlign: 'center',
          fontSize: 12,
          paddingBottom: 10,
          fontWeight: '700'
        }}
      >
        {dateToString(game.creationDate)}
      </Text>
      <SportCard
        sport={{ ...game.sport }}
        style={_style.sportCard}
        textStyle={{ color: '#CFD5DE' }}
        iconColor="#CFD5DE"
        title={game.name}
        onPress={() => onCardPress(game.id)}
      />
      <View style={_style.gameInfoContainer}>
        <View style={_style.authorInfoContainer}>
          <UserAvatar src={getRandomUser()} size={22} />
          <Text style={_style.nickname}>{game.author.nickname}</Text>
          {/* <Text style={_style.nickname}>Москва</Text> */}
        </View>
        {/* <Text style={_style.date}>20.10.2018</Text> */}
      </View>
    </View>
  );
};

const _style = StyleSheet.create({
  container: {},
  sportCard: {
    width: 150,
    minHeight: 80,
    marginRight: 10,
    // backgroundColor: "#51A9FF",
    backgroundColor: 'white'
  },
  gameInfoContainer: { paddingVertical: 10, paddingHorizontal: 2 },
  authorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5
  },
  nickname: {
    paddingLeft: 5,
    color: '#A4AECB',
    fontWeight: '500',
    fontSize: 12
  },
  date: { color: '#DBE2EB', fontWeight: '500', fontSize: 10 }
});

export default GameItem;
