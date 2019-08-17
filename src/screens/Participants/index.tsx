import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import ParticipantsHeader from './Header';
import withAdaptiveScreen from '../../components/hocs/WithAdaptiveScreen';
import { gradient } from '../../constants/generalStyles';
import { IAdaptiveScreenOptions } from '../../components/hocs/WithAdaptiveScreen/index';
import ParticipantsList from './ParticipantsList';

type Props = {} & NavigationInjectedProps;

interface State {}

class ParticipantsScreen extends React.Component<Props, State> {
  static navigationOptions = {
    // tslint:disable-next-line:no-null-keyword
    header: null
  };

  public render() {
    const gameId = this.props.navigation.getParam('gameId');
    console.log('gameId', gameId);

    return (
      <View style={_styles.mainContainer}>
        <ParticipantsHeader
          style={{ paddingHorizontal: 30 }}
          title="Участники игры"
          subTitle="Подробную информацию о каждом из участников можно увидеть, нажав на соответствующий элемент списка"
        />
        <ParticipantsList gameId={gameId} />
      </View>

      // <GetParticipants
      //   query={GET_GAME_PARTICIPANTS_GQL}
      //   variables={{ id: gameId }}
      // >
      //   {({ loading, error, data }) => {
      //     console.log('part', data);
      //     if (error) {
      //       return <Text>{error.message}(</Text>;
      //     }
      //     return loading || !data ? (
      //       <Text>Loading...</Text>
      //     ) : (

      //     );
      //   }}
      // </GetParticipants>
    );
  }
}

const screenOptions: IAdaptiveScreenOptions = {
  transparentHeader: true,
  gradient: gradient,
  barStyle: 'light-content'
};

export default withAdaptiveScreen(ParticipantsScreen, screenOptions);

const _styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: 'white'
  }
});
