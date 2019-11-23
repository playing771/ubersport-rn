import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationStackOptions } from 'react-navigation-stack';
import { IGame } from '../../api/games/types';
import { defaultHeaderOptions } from '../../defaultHeaderOptions';
import useNavigation from '../../hooks/useNavigation';
import { NavigationRoot } from '../../navigation/roots';
import { deepOmit } from '../../utils/helpers';
import { IGameEditData } from '../EditGame/index';
import GameDetails from './GameDetails';

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
        onPressEdit={onPressEdit}
        onPressParticipants={onPressParticipants}
      />
    </View>
  );
}

const headerOptions: NavigationStackOptions = {
  title: 'Информация об игре',
  ...defaultHeaderOptions,
};

GameInfoScreen.navigationOptions = headerOptions;

// headerTransparent: true, // TODO: fix

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
