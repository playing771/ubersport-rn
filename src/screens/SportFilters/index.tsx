import React, { useState, useContext } from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { AppContext, IAppContextInjectedProp } from '../../other/context/sports';
import withAdaptiveScreen from '../../components/hocs/WithAdaptiveScreen';
import { IAdaptiveScreenOptions } from '../../components/hocs/WithAdaptiveScreen';
import { gradient } from '../../constants/generalStyles';
import ToggleableItem from '../../components/ToggleableItem';
import Header from './Header';
import { ScrollView } from 'react-native-gesture-handler';
import ISport from '../../api/sports/Sport.type';
import withAppContext from '../../components/hocs/WithAppContext';
import SportsList from '../../components/SportsList';
import useFavouriteSportsQuery from '../../components/SportsList/gql';
import ErrorGqlCard from '../../components/ErrorCard/ErrorGqlCard';
import ULoader from '../../components/ULoader';
import useAppContext from '../../hooks/useAppContext';
import FavouriteSportsList from '../../components/SportsList/FavouriteSportsList';
import SportsListInner from '../../components/SportsList/SportsListInner';
import { number } from 'prop-types';
import useNavigation from '../../hooks/useNavigation';
import { withNavigation } from 'react-navigation';
import onlyUniqFromArrays from '../../other/onlyUniqsFromArrays';
import getUniqFromArray from '../../other/getUniqsFromArray';
import SportsListView from '../../components/SportsList/SportsListView';
import useAvaliableSportsQuery from '../../api/sports/useAvaliableSportsQuery';

interface IProps {}

interface IState {
  selected: number[];
}
function SportFilters(props: any) {
  const { getParam } = useNavigation();
  const { user } = useAppContext();

  const sports = getParam('activeFilters').sportIds;
  // console.log('initial sports', sports);

  const { data: fData, loading: fLoading, error: fError } = useFavouriteSportsQuery({
    id: user.id,
  });
  const { data: aData, loading: aLoading, error: aErrror } = useAvaliableSportsQuery();
  const [selected, setSelected] = useState<number[]>(sports); // TODO: remove state?
  // console.log('inital selected', selected);

  // state: IState = { selected: [] };

  const toggleSelection = (ids: number[]) => {
    // const _selected = [...selected];
    const changeSportFilterHanlde = getParam('changeSportFilterHanlde');
    // console.log('ids', ids);

    console.log('ids', ids);

    // const tmp = getUniqFromArray([...ids]);
    // const itemIndex = tmp.findIndex(s => ids.some(id => id === s));
    // if (itemIndex === 1) {
    //   console.log('result', tmp.slice(itemIndex, 1));

    //   changeSportFilterHanlde(tmp.slice(itemIndex, 1));
    // } else {
    //   console.log('result', tmp);

    //   changeSportFilterHanlde(tmp);
    // }

    // console.log('tmp', tmp);
    // changeSportFilterHanlde(selected);

    // changeSportFilterHanlde(tmp);
    // const itemIndex = selected.findIndex(s => s === id);
    // if (itemIndex > -1) {
    //   setSelected([...selected.splice(itemIndex, 1)]);
    // } else {
    //   setSelected([...selected, itemIndex]);
    // }

    // console.log('selected', selected);

    // setSelected(_selected);
  };

  if (fError || aErrror) {
    return <ErrorGqlCard error={fError || aErrror} />;
  }

  // const favoriteSports = !loading ? data.getFavouriteSports.favoriteSports : [];
  console.log('SPORTS REINIT', sports);

  return (
    <ScrollView style={styles.container}>
      <Header>Избранные виды</Header>
      {/* 
      <SportsListInner
        // exclude={favoriteSports}
        // selectedItems={state.selected}
        sports={favoriteSports}
        // itemPressHandle={toggleSelection}
        onChange={toggleSelection}
        initialValues={sports}
        loading={loading}
      /> */}
      <SportsListView
        loading={fLoading}
        selectedSports={[]}
        sports={fData.getFavouriteSports && fData.getFavouriteSports.favoriteSports}
        onChangeHandle={() => undefined}
      />

      <Header>Прочие виды</Header>
      <SportsListView
        loading={aLoading}
        selectedSports={[]}
        sports={aData && aData.sports}
        onChangeHandle={() => undefined}
      />
      {/* <SportsList
        exclude={favoriteSports}
        // selectedItems={state.selected}
        // initialValues={selected}
        // itemPressHandle={toggleSelection}
        initialValues={sports}
        onChange={toggleSelection}
      /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    // paddingVertical: 12,
    flex: 1,
    paddingHorizontal: 18,
  },
  item: {
    minHeight: 50,
  },
  itemText: {
    fontSize: 16,
  },
});

const screenOptions: IAdaptiveScreenOptions = {
  transparentHeader: true,
  gradient,
  barStyle: 'light-content',
  // style: styles.mainContainer
};

SportFilters.navigationOptions = {
  title: 'Информация об игре',
  headerTitleStyle: {
    color: '#fff',
    fontWeight: '400',
  },
  headerTransparent: true, // TODO: fix
};

export default withAdaptiveScreen(SportFilters, screenOptions);
