import * as React from 'react';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import GameItem from './GameItem';
import { GameStatus, IGame } from '../../api/games/types';
import { GamesQuery } from '../../api/games/getGamesQuery';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { BOTTOM_BIG_NOTCH } from '../../components/AdaptiveScreen/index';
import handleApoloError from '../../other/handleApoloError';

interface Props {
  userId: string;
  onGamePress: (gameId: string) => void;
  status: GameStatus;
  title: string;
  emptyText: string;
  query: object;
}

const ProfileGamesList: React.FC<Props> = ({
  userId,
  onGamePress,
  status,
  title,
  emptyText,
  query,
}) => {
  console.log('ProfileGamesList', { participantsIds: [userId], status });

  return (
    // <GamesQuery query={query} variables={{ participantsIds: [userId], status }}>
    //   {({ loading, error, data, networkStatus }) => {
    //     if (error) {
    //       console.log(handleApoloError(error));

    //       return <Text>{error.message}(</Text>;
    //     }

    //     return loading || !data ? (
    //       <Text>Loading...</Text>
    //     ) : (
    //       <>
    //         <Text style={_style.header}>{title}</Text>
    //         <View style={_style.container}>
    //           {data.games.games.length ? (
    //             <FlatList<IGame>
    //               showsHorizontalScrollIndicator={false}
    //               // style={{ marginBottom: 80 }}
    //               contentContainerStyle={
    //                 isIphoneX()
    //                   ? { paddingBottom: BOTTOM_BIG_NOTCH + 25 }
    //                   : undefined
    //               }
    //               data={data.games.games}
    //               horizontal={true}
    //               keyExtractor={(item, index) => index.toString()}
    //               renderItem={({ item, separators }) => (
    //                 <GameItem game={item} onCardPress={onGamePress} />
    //               )}
    //             />
    //           ) : (
    //             <Text style={_style.emptyText}>{emptyText}</Text>
    //           )}

    //         </View>
    //       </>
    //     );
    //   }}
    // </GamesQuery>
    <View></View>
  );
};

const _style = StyleSheet.create({
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
