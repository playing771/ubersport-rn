import React, { useState, useEffect } from 'react';

import { ScrollView, StyleSheet } from 'react-native';

import { NavigationInjectedProps } from 'react-navigation';

import { GameStatus } from '../../api/games/types';
import { gradient } from '../../constants/generalStyles';
import { NavigationRoot } from '../../navigation/roots';
import FiltersPanel from './FiltersPanel';
import withAdaptiveScreen from '../../components/hocs/WithAdaptiveScreen';
import { IAdaptiveScreenOptions } from '../../components/hocs/WithAdaptiveScreen';
import GamesList from './GamesList';
import { IGamesListQueryFilters } from './gql';
import useNavigation from '../../hooks/useNavigation';

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
      {/* <UButton title="LOGIN" onPress={() => props.navigation.navigate(NavigationRoot.Auth)} /> */}
      <FiltersPanel
        activeSort={sort}
        activeFilters={activeFilters}
        onChangeActiveSort={changeActiveSort}
        changeSportFilterHanlde={changeSportFilterHanlde}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.listContainer}>
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
    paddingVertical: 12,
  },
  card: { marginBottom: 8, borderBottomColor: '#9B9B9B' },
});

const screenOptions: IAdaptiveScreenOptions = {
  transparentHeader: true,
  gradient,
  barStyle: 'light-content',
};

FindGameScreen.navigationOptions = {
  title: 'Поиск игр',
  // headerLeft: (
  //   <View style={{ paddingHorizontal: 12 }}>
  //     <UButton
  //       onPress={() => alert('This is a button!')}
  //       icon="ios-menu"
  //       iconColor="#dcdcdc"
  //       // iconStyle={{ width: 20, height: 20 }}
  //       iconSize={28}
  //       backgroundColor="transparent"
  //       style={{ width: 40, height: 40 }}
  //     />
  //   </View>
  // ),
  // headerRight: (
  //   <View
  //     style={{
  //       paddingHorizontal: 6,
  //       flexDirection: 'row',
  //       // justifyContent: 'center',
  //       // width: '100%'
  //     }}
  //   >
  //     <UButton
  //       onPress={() => alert('This is a button!')}
  //       icon="ios-search"
  //       iconColor="#dcdcdc"
  //       // iconStyle={{ width: 20, height: 20 }}
  //       iconSize={24}
  //       backgroundColor="transparent"
  //       style={{ width: 40, height: 40, marginRight: 10 }}
  //     />
  //     <UButton
  //       onPress={() => alert('This is a button!')}
  //       // iconStyle={{ width: 20, height: 20 }}
  //       backgroundColor="transparent"
  //       // style={{ width: 40, height: 40 }}
  //     >
  //       <EvilIcons name="bell" size={30} color="#dcdcdc" />
  //     </UButton>
  //   </View>
  // ),
  headerTitleStyle: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 22,
  },
  headerTransparent: true, // TODO: fix
};

export default withAdaptiveScreen(FindGameScreen, screenOptions);
