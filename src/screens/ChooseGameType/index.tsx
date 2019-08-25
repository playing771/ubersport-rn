import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { AppContext } from '../../other/context/sports';
import { NavigationScreenProps } from 'react-navigation';
import { CardNameObj } from '../../components/SportCard/index';
import SportCard from '../../components/SportCard/index';
import { NavigationRoot } from '../../navigation/roots';
import withAppContext from '../../components/hocs/WithAppContext';

interface Props extends NavigationScreenProps {
  ctx: AppContext;
}
interface State {
  activeSport: string | undefined;
}

const params = {
  size: 60,
  iconColorActive: 'white',
  color: '#999a9b',
};

@withAppContext
export default class ChooseGameTypeScreen extends React.Component<Props, State> {
  // static navigationOptions = {
  //   title: "Новая игра"
  // };

  state = {
    activeSport: undefined,
  };

  getTextIconColor = (sport: string): string => {
    // console.log(sport, this.state.activeSport);
    return this.state.activeSport === sport ? params.iconColorActive : params.color;
  };

  onCardPress = (sport: CardNameObj): void => {
    this.setState({ activeSport: sport.id }, () => {
      const { navigate } = this.props.navigation;
      navigate(NavigationRoot.EditGame, { sport });
    });
  };

  private keyExtractor = (item: string, index: number) => item;

  private renderItem = ({ item }: { item: string }) => {
    return (
      <SportCard
        sport={this.props.ctx.sports[item]}
        onPress={this.onCardPress}
        // onShowUnderlay={this.onShowUnderlay}
        // onHideUnderlay={this.onHideUnderlay}
        textStyle={[s.cardTitle]}
        iconColor={this.getTextIconColor(item)}
        style={s.card}
      />
    );
  };

  public render() {
    const { sports } = this.props.ctx;
    return (
      <View style={s.mainContainer}>
        <Text style={s.header}>Какую игру вы хотите создать?</Text>
        <FlatList
          contentContainerStyle={s.cardContainer}
          data={Object.keys(sports)}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          numColumns={3}
        />
      </View>
    );
  }
}

const s = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: "#E7EAEE",
    // backgroundColor: "#61c037",
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  header: {
    color: '#333',
    fontSize: 28,
    fontFamily: 'Avenir',
    fontWeight: '900',
    paddingVertical: 20,
    // paddingHorizontal: 5
  },
  cardContainer: {
    // flexDirection: 'row',

    justifyContent: 'center',
    paddingLeft: 10,
  },
  card: {
    height: 150,
    minWidth: 100,
    flex: 1,
    marginBottom: 5,
    marginRight: 10,
  },
  cardTitle: { color: params.color },
});
