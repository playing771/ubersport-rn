import * as React from 'react';

import { View, StyleSheet } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { gradient } from '../../constants/generalStyles';
import { AppContext } from '../../other/context/sports';
import GameDetails from './GameDetails';
import { IGame } from '../../api/games/types';
import { deepOmit } from '../../other/helpers';
import { IGameEditData } from '../EditGame/index';
import { NavigationRoot } from '../../navigation/roots';
import withAdaptiveScreen, {
  IAdaptiveScreenOptions
} from '../../components/hocs/WithAdaptiveScreen';
import withAppContext from '../../components/hocs/WithAppContext';

type IProps = { ctx: AppContext } & NavigationInjectedProps;

interface IState {}

@withAppContext
class GameInfoScreen extends React.Component<IProps, IState> {
  static navigationOptions = {
    title: 'Информация об игре',
    headerTitleStyle: {
      color: '#fff',
      fontWeight: '400'
    },
    headerTransparent: true // TODO: fix
  };

  // private isParticipant = (
  //   userId: string,
  //   participants: Array<IParticipant>
  // ): boolean => {
  //   return participants.some(p => p.id === userId);
  // };

  private onPressEdit = (game: IGame): void => {
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
      id: _game.id
    };

    this.props.navigation.navigate(NavigationRoot.EditGame, { gameEditData });
  };

  onPressParticipants = () => {
    const { navigation } = this.props;
    navigation.navigate(NavigationRoot.Participants, {
      gameId: navigation.getParam('gameId')
    });
  };

  public render() {
    const gameId = this.props.navigation.getParam('gameId');
    const { ctx } = this.props;

    return (
      <View style={styles.container}>
        <GameDetails
          id={gameId}
          ctx={ctx}
          onPressEdit={this.onPressEdit}
          onPressParticipants={this.onPressParticipants}
        />
      </View>
    );
  }
}

const screenOptions: IAdaptiveScreenOptions = {
  transparentHeader: true,
  gradient: gradient,
  barStyle: 'light-content'
};

export default withAdaptiveScreen(GameInfoScreen, screenOptions);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
