import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationStackOptions } from 'react-navigation-stack';
import { GameStatus } from '../../api/games/types';
import { HEADER_BACKGROUND } from '../../constants/Colors';
import useNavigation from '../../hooks/useNavigation';
import { NavigationRoot } from '../../navigation/roots';
import sharedStyles from '../../sharedStyles';
import { locationUtils } from '../../utils/location';
import { ObjectMap, Sort, SortType } from '../../utils/types';
import FiltersPanel from './FiltersPanel';
import { GamesList } from './GamesList';
import { IGamesListQueryFilters } from './gql';

export type IFindGameFilters = IGamesListQueryFilters;

const SORTS: ObjectMap<Sort, SortType> = {
  time: { sort: 'time', sortOrder: 'ASC' }, // Скоро начало
  date: { sort: 'date', sortOrder: 'DESC' }, // Новые
  distance: { sort: 'distance', sortOrder: 'DESC' }, // Ближайшие
};

// для поиска игр, фльтр по статусу доджен быть всегда "PENDING"

function FindGameScreen() {
  const { navigate } = useNavigation();

  // TODO: merge states in one to prevent 2 renders
  const [sort, setSort] = useState<Sort>(SORTS.date);
  const [activeFilters, setFilters] = useState<IFindGameFilters>({
    sportIds: undefined,
    status: GameStatus.Pending,
  });
  const [myLocation, setMyLocation] = useState<Position>();

  useEffect(() => {
    getMyLocation();
  }, []);

  const changeActiveSort = async (sortingType: SortType, toggleModal: () => void) => {
    toggleModal();
    setSort(SORTS[sortingType]);
    if (sortingType === 'distance') {
      // await getMyLocation();
      if (myLocation) {
        const { latitude, longitude } = myLocation.coords;
        setFilters({ ...activeFilters, location: { latitude, longitude } });
      }
    }
  };

  const changeSportFilterHanlde = (sportIds: number[]) => {
    // если выбранных фильтров нет, ставим undefined
    setFilters({ ...activeFilters, sportIds: sportIds.length > 0 ? sportIds : undefined });
  };

  const onGameCardPress = (gameId: string): void => {
    navigate(NavigationRoot.GameInfo, { gameId });
  };

  async function getMyLocation() {
    const location = await locationUtils.getMyLocationAsync();

    if (location) {
      setMyLocation(location);
      // setSort(SORTS.distance);
    }
  }

  return (
    <SafeAreaView style={[styles.container, sharedStyles.headerlessScreen]}>
      <View style={styles.contentContainer}>
        <StatusBar barStyle="light-content" />
        <FiltersPanel
          activeSort={sort.sort}
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
