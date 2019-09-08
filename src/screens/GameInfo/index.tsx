import React from 'react';

import { View, StyleSheet, StatusBar } from 'react-native';
import GameDetails from './GameDetails';
import { IGame } from '../../api/games/types';
import { deepOmit } from '../../utils/helpers';
import { IGameEditData } from '../EditGame/index';
import { NavigationRoot } from '../../navigation/roots';
import useNavigation from '../../hooks/useNavigation';
import sharedStyles from '../../sharedStyles';

interface IProps {}

function GameInfoScreen(props: IProps) {
  const { navigate, getParam } = useNavigation();

  const onPressEdit = (game: IGame): void => {
    // удаляем __typename, который добавляется автоматически, но нам не нужен
    const _game = deepOmit(game, '__typename');
    const gameEditData: IGameEditData = {
      dateStart: _game.dateStart,
      dateEnd: _game.dateEnd,
      location: _game.location,
      name: _game.name,
      description: _game.description,
      minParticipants: _game.minParticipants,
      maxParticipants: _game.maxParticipants,
      ageLimit: _game.ageLimit,
      sportId: _game.sport.id,
      id: _game.id,
    };

    navigate(NavigationRoot.EditGame, { gameEditData });
  };

  const onPressParticipants = () => {
    navigate(NavigationRoot.Participants, {
      gameId: getParam('gameId'),
    });
  };

  const gameId = getParam('gameId');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <GameDetails
        id={gameId}
        // ctx={ctx}
        onPressEdit={onPressEdit}
        onPressParticipants={onPressParticipants}
      />
    </View>
  );
}

GameInfoScreen.navigationOptions = {
  title: 'Информация об игре',
  headerTitleStyle: {
    color: '#fff',
    fontWeight: '400',
  },
  headerStyle: sharedStyles.header,
  // headerTransparent: true, // TODO: fix
};

// const screenOptions: IAdaptiveScreenOptions = {
//   transparentHeader: true,
//   gradient,
//   barStyle: 'light-content',
// };

export default GameInfoScreen;
// export default withAdaptiveScreen(GameInfoScreen, screenOptions);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
