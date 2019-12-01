import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationStackOptions } from 'react-navigation-stack';
import { GameStatus } from '../../api/games/types';
import { HEADER_BACKGROUND } from '../../constants/Colors';
import useNavigation from '../../hooks/useNavigation';
import { NavigationRoot } from '../../navigation/roots';
import sharedStyles from '../../sharedStyles';
import { locationUtils } from '../../utils/location';
import FiltersPanel from './FiltersPanel';
import { GamesList } from './GamesList';
import { IGamesListQueryFilters } from './gql';

export type ISearchGameSort = 'time' | 'distance' | 'date';
export type IFindGameFilters = IGamesListQueryFilters;

// для поиска игр, фльтр по статусу доджен быть всегда "PENDING"

function FindGameScreen() {
  const { navigate } = useNavigation();

  // TODO: merge states in one to prevent 2 renders
  const [sort, setSort] = useState<ISearchGameSort>('date');
  const [activeFilters, setFilters] = useState<IFindGameFilters>({
    sportIds: undefined,
    status: GameStatus.Pending,
  });
  const [myLocation, setMyLocation] = useState<Position>();

  useEffect(() => {
    (async function() {
      const location = await locationUtils.getMyLocationAsync();

      if (location) {
        setMyLocation(location);
        setSort('distance');
      }
    })();
  }, []);

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

  return (
    <SafeAreaView style={[styles.container, sharedStyles.headerlessScreen]}>
      <View style={styles.contentContainer}>
        <StatusBar barStyle="light-content" />
        <FiltersPanel
          activeSort={sort}
          activeFilters={activeFilters}
          onChangeActiveSort={changeActiveSort}
          changeSportFilterHanlde={changeSportFilterHanlde}
          myLocation={myLocation}
        />

        <GamesList onGameCardPress={onGameCardPress} sort={sort} filters={activeFilters} />
      </View>
    </SafeAreaView>
  );
}

FindGameScreen.navigationOptions = ({ navigation }: any) => {
  const headerOptions: NavigationStackOptions = {
    header: null,
  };

  return headerOptions;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: HEADER_BACKGROUND, paddingTop: 24 },
  contentContainer: { flex: 1, backgroundColor: '#F9F9FA' },
});

export default FindGameScreen;
