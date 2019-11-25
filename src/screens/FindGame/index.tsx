import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { NavigationStackOptions } from 'react-navigation-stack';
import { GameStatus } from '../../api/games/types';
import useNavigation from '../../hooks/useNavigation';
import { NavigationRoot } from '../../navigation/roots';
import sharedStyles from '../../sharedStyles';
import FiltersPanel from './FiltersPanel';
import { GamesList } from './GamesList';
import { IGamesListQueryFilters } from './gql';

interface IProps extends NavigationInjectedProps {}

export type ISearchGameSort = 'time' | 'distance' | 'date';
export type IFindGameFilters = IGamesListQueryFilters;

// для поиска игр, фльтр по статусу доджен быть всегда "PENDING"

function FindGameScreen(props: IProps) {
  const { navigate } = useNavigation();

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

  return (
    <>
      <StatusBar barStyle="light-content" />
      <FiltersPanel
        activeSort={sort}
        activeFilters={activeFilters}
        onChangeActiveSort={changeActiveSort}
        changeSportFilterHanlde={changeSportFilterHanlde}
      />

      <GamesList onGameCardPress={onGameCardPress} sort={sort} filters={activeFilters} />
    </>
  );
}

FindGameScreen.navigationOptions = ({ navigation }: any) => {
  const editGeoHandle = () => {
    navigation.navigate(NavigationRoot.Location);
  };

  const headerOptions: NavigationStackOptions = {
    title: 'Поиск игр',
    // headerLeft: () => <FindGameHeaderTitle editGeoHandle={editGeoHandle} />,
    headerTitleStyle: {
      ...sharedStyles.headerTitleStyle,
    },
    headerStyle: [sharedStyles.header, sharedStyles.borderLessHeader],
    // headerTransparent: true, // TODO: fix
  };

  return headerOptions;
};

export default FindGameScreen;
