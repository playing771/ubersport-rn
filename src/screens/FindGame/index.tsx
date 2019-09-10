import React, { useState } from 'react';

import { ScrollView, StyleSheet, Animated, StatusBar } from 'react-native';

import { NavigationInjectedProps } from 'react-navigation';

import { GameStatus } from '../../api/games/types';
import { NavigationRoot } from '../../navigation/roots';
import FiltersPanel from './FiltersPanel';
import GamesList from './GamesList';
import { IGamesListQueryFilters } from './gql';
import useNavigation from '../../hooks/useNavigation';
import FindGameHeaderTitle from './FindGameHeaderTitle';
import sharedStyles from '../../sharedStyles';

interface IProps extends NavigationInjectedProps {}

export type ISearchGameSort = 'time' | 'distance' | 'date';
export type IFindGameFilters = IGamesListQueryFilters;

const HEADER_EXPANDED_HEIGHT = 70;
const HEADER_COLLAPSED_HEIGHT = 0;

// для поиска игр, фльтр по статусу доджен быть всегда "PENDING"

function FindGameScreen(props: IProps) {
  const { navigate } = useNavigation();

  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const [sort, setSort] = useState<ISearchGameSort>('distance');
  const [activeFilters, setFilters] = useState<IFindGameFilters>({
    sportIds: undefined,
    status: GameStatus.Pending,
  });

  const changeActiveSort = (sorting: ISearchGameSort, toggleModal: () => void) => {
    toggleModal();
    setSort(sorting);
  };

  const changeSportFilterHanlde = (sportIds: number[]) => {
    // если выбранных фильтров нет, ставим undefined
    setFilters({ ...activeFilters, sportIds: sportIds.length > 0 ? sportIds : undefined });
  };

  const onGameCardPress = (gameId: string): void => {
    navigate(NavigationRoot.GameInfo, { gameId });
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: 'clamp',
  });
  return (
    <>
      <StatusBar barStyle="light-content" />
      {/* <UButton title="LOGIN" onPress={() => props.navigation.navigate(NavigationRoot.Auth)} /> */}
      <Animated.View style={{ height: headerHeight }}>
        <FiltersPanel
          activeSort={sort}
          activeFilters={activeFilters}
          onChangeActiveSort={changeActiveSort}
          changeSportFilterHanlde={changeSportFilterHanlde}
        />
      </Animated.View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.listContainer}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ])}
      >
        <GamesList onGameCardPress={onGameCardPress} sort={sort} filters={activeFilters} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {},
  listContainer: {
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  card: { marginBottom: 8, borderBottomColor: '#9B9B9B' },
});

// const screenOptions: IAdaptiveScreenOptions = {
//   transparentHeader: true,
//   gradient,
//   barStyle: 'light-content',
// };

FindGameScreen.navigationOptions = ({ navigation }) => {
  const editGeoHandle = () => {
    navigation.navigate(NavigationRoot.Location);
  };

  return {
    // title: 'Поиск игр',
    headerLeft: () => <FindGameHeaderTitle editGeoHandle={editGeoHandle} />,
    headerTitleStyle: {
      color: '#fff',
      fontWeight: '400',
      fontSize: 22,
    },
    headerStyle: [sharedStyles.header, sharedStyles.borderLessHeader],
    // headerTransparent: true, // TODO: fix
  };
};

export default FindGameScreen;
