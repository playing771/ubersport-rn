import React, { useState, useEffect } from 'react';

import { ScrollView, StyleSheet, Animated, View, Text } from 'react-native';

import { NavigationInjectedProps } from 'react-navigation';

import { GameStatus, ILocation } from '../../api/games/types';
import { gradient } from '../../constants/generalStyles';
import { NavigationRoot } from '../../navigation/roots';
import FiltersPanel from './FiltersPanel';
import withAdaptiveScreen from '../../components/hocs/WithAdaptiveScreen';
import { IAdaptiveScreenOptions } from '../../components/hocs/WithAdaptiveScreen';
import GamesList from './GamesList';
import { IGamesListQueryFilters } from './gql';
import useNavigation from '../../hooks/useNavigation';
import UButton from '../../components/UButton';
import { EvilIcons, Entypo } from '@expo/vector-icons';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import FindGameHeaderTitle from './FindGameHeaderTitle';

interface IProps extends NavigationInjectedProps {}

export type ISearchGameSort = 'time' | 'distance' | 'date';
export type IFindGameFilters = IGamesListQueryFilters;

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

  const HEADER_EXPANDED_HEIGHT = 70;
  const HEADER_COLLAPSED_HEIGHT = 0;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: 'clamp',
  });
  return (
    <>
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
    paddingVertical: 12,
  },
  card: { marginBottom: 8, borderBottomColor: '#9B9B9B' },
});

const screenOptions: IAdaptiveScreenOptions = {
  transparentHeader: true,
  gradient,
  barStyle: 'light-content',
};

FindGameScreen.navigationOptions = ({ navigation }) => {
  let ownLocation;

  const onChangeLocation = (location: ILocation) => {
    ownLocation = location;
  };
  const editGeoHandle = () => {
    navigation.navigate(NavigationRoot.Location, {
      onChangeLocation,
    });
  };

  return {
    // title: 'Поиск игр',
    headerTitle: FindGameHeaderTitle,
    headerRight: (
      <View
        style={{
          paddingHorizontal: 6,
          flexDirection: 'row',
          // justifyContent: 'center',
          // width: '100%'
        }}
      >
        <UButton
          onPress={editGeoHandle}
          // iconStyle={{ width: 20, height: 20 }}
          backgroundColor="transparent"
          // style={{ width: 40, height: 40 }}
          style={{ width: 40, height: 40, marginRight: 10 }}
        >
          <Entypo name="sound-mix" size={24} color="#dcdcdc" />
        </UButton>
      </View>
    ),
    headerTitleStyle: {
      color: '#fff',
      fontWeight: '400',
      fontSize: 22,
    },
    headerTransparent: true, // TODO: fix
  };
};

export default withAdaptiveScreen(FindGameScreen, screenOptions);
