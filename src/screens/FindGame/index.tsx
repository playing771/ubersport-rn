import * as React from 'react';

import {
  ScrollView,
  GestureResponderEvent,
  StyleSheet,
  View
} from 'react-native';

import { NavigationInjectedProps } from 'react-navigation';

import { GameStatus } from '../../api/games/types';
import { gradient } from '../../constants/generalStyles';
import { NavigationRoot } from '../../navigation/roots';
import { ApolloError } from 'apollo-client';
import UButton from '../../components/UButton';
import { EvilIcons } from '@expo/vector-icons';
import FiltersPanel from './FiltersPanel';
import withAdaptiveScreen from '../../components/hocs/WithAdaptiveScreen';
import { IAdaptiveScreenOptions } from '../../components/hocs/WithAdaptiveScreen';
import GamesList from './GamesList';

interface IProps extends NavigationInjectedProps {}

export type ISearchGameSort = 'time' | 'distance' | 'date';

interface IState {
  sort: ISearchGameSort;

  // filters: {
  //   sportId: string | undefined;
  // };
}

class FindGameScreen extends React.Component<IProps, IState> {
  static navigationOptions = {
    title: 'Поиск',
    headerLeft: (
      <View style={{ paddingHorizontal: 12 }}>
        <UButton
          onPress={() => alert('This is a button!')}
          icon="ios-menu"
          iconColor="#dcdcdc"
          // iconStyle={{ width: 20, height: 20 }}
          iconSize={28}
          backgroundColor="transparent"
          style={{ width: 40, height: 40 }}
        />
      </View>
    ),
    headerRight: (
      <View
        style={{
          paddingHorizontal: 6,
          flexDirection: 'row'
          // justifyContent: 'center',
          // width: '100%'
        }}
      >
        <UButton
          onPress={() => alert('This is a button!')}
          icon="ios-search"
          iconColor="#dcdcdc"
          // iconStyle={{ width: 20, height: 20 }}
          iconSize={24}
          backgroundColor="transparent"
          style={{ width: 40, height: 40, marginRight: 10 }}
        />
        <UButton
          onPress={() => alert('This is a button!')}
          // iconStyle={{ width: 20, height: 20 }}
          backgroundColor="transparent"
          // style={{ width: 40, height: 40 }}
        >
          <EvilIcons name="bell" size={30} color="#dcdcdc" />
        </UButton>
      </View>
    ),
    headerTitleStyle: {
      color: '#fff',
      fontWeight: '400',
      fontSize: 22
    },
    headerTransparent: true // TODO: fix
  };

  // state = {
  //   filters: { sportId: undefined }
  // };

  state: IState = {
    sort: 'distance'
  };

  componentWillMount() {
    console.log('FINDGAME MOUNTED');
    this.props.navigation.setParams({
      onFilterBtnClick: this.onSportFilterChange
    });
  }

  onSportFilterChange = (e: GestureResponderEvent, sportId?: string): void => {
    if (!sportId) {
      throw new Error('onSportFilterChange: sportId is not set');
    }
    // this.setState({ filters: { sportId } });
  };

  changeActiveSort = (sort: ISearchGameSort, toggleModal: () => void) => {
    toggleModal();
    this.setState({ sort });
  };

  onGameCardPress = (gameId: string): void => {
    this.props.navigation.navigate(NavigationRoot.GameInfo, { gameId });
  };

  onError = (err: ApolloError) => {
    console.log(err);

    if (err.networkError && (err.networkError as any).error) {
      (err.networkError as any).result.errors.forEach((error: any) => {
        console.log(error.message);
      });
    } else {
      console.log(err);
    }
  };

  public render(): JSX.Element {
    const { sort } = this.state;
    // const { sportId } = this.state.filters;
    const status = GameStatus.Pending;
    return (
      <>
        <UButton
          title="LOGIN"
          onPress={() => this.props.navigation.navigate(NavigationRoot.Auth)}
        />
        <FiltersPanel
          activeSort={sort}
          onChangeActiveSort={this.changeActiveSort}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.listContainer}
        >
          <GamesList onGameCardPress={this.onGameCardPress} status={status} />
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {},
  listContainer: {
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  card: { marginBottom: 8, borderBottomColor: '#9B9B9B' }
});

const screenOptions: IAdaptiveScreenOptions = {
  transparentHeader: true,
  gradient: gradient,
  barStyle: 'light-content'
};

export default withAdaptiveScreen(FindGameScreen, screenOptions);
