import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import withAdaptiveScreen from '../../components/hocs/WithAdaptiveScreen';
import { IAdaptiveScreenOptions } from '../../components/hocs/WithAdaptiveScreen';
import { gradient } from '../../constants/generalStyles';
import Header from './Header';
import { ScrollView } from 'react-native-gesture-handler';
import useFavouriteSportsQuery from '../../components/SportsList/gql';
import ErrorGqlCard from '../../components/ErrorCard/ErrorGqlCard';

import useAppContext from '../../hooks/useAppContext';
import useNavigation from '../../hooks/useNavigation';

import onlyUniqFromArrays from '../../other/onlyUniqsFromArrays';

import SportsListView from '../../components/SportsList/SportsListView';
import useAvaliableSportsQuery from '../../api/sports/useAvaliableSportsQuery';

interface IProps {}

function SportFilters(props: IProps) {
  const { getParam } = useNavigation();
  const { user } = useAppContext();

  const sports: number[] = getParam('activeFilters').sportIds || [];

  const { data: fData, loading: fLoading, error: fError } = useFavouriteSportsQuery({
    id: user.id,
  });
  const { data: aData, loading: aLoading, error: aErrror } = useAvaliableSportsQuery();
  const [selected, setSelected] = useState<number[]>(sports); // TODO: remove state?

  const toggleSelection = (id: number) => {
    const newSelected =
      selected.indexOf(id) === -1 ? [...selected, id] : selected.filter(sel => sel !== id);

    setSelected(newSelected);
    const changeSportFilterHanlde = getParam('changeSportFilterHanlde');
    changeSportFilterHanlde(newSelected);
  };

  if (fError || aErrror) {
    return <ErrorGqlCard error={fError || aErrror} />;
  }

  const loading = aLoading && fLoading;

  const sportsList = onlyUniqFromArrays(
    aData.sports,
    fData.getFavouriteSports && fData.getFavouriteSports.favoriteSports
  );

  return (
    <ScrollView style={styles.container}>
      <Header>Избранные виды</Header>
      <SportsListView
        loading={loading}
        selectedSports={selected}
        sports={fData.getFavouriteSports && fData.getFavouriteSports.favoriteSports}
        onChangeHandle={toggleSelection}
      />
      <Header>Прочие виды</Header>
      <SportsListView
        loading={loading}
        selectedSports={selected}
        sports={sportsList}
        onChangeHandle={toggleSelection}
      />
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
