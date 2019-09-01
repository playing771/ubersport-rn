import React from 'react';
import withAdaptiveScreen from '../../../components/hocs/WithAdaptiveScreen';
import { IAdaptiveScreenOptions } from '../../../components/hocs/WithAdaptiveScreen';
import { gradient } from '../../../constants/generalStyles';
import useNavigation from '../../../hooks/useNavigation';
import SportsSelect from '../../../components/SportsList/SportsSelect';

interface IProps {}

function SportFilters(props: IProps) {
  const { getParam } = useNavigation();

  const sports: number[] = getParam('activeFilters').sportIds || [];
  const changeSportFilterHanlde = getParam('changeSportFilterHanlde');

  return (
    <SportsSelect initialSelection={sports} changeSportFilterHanlde={changeSportFilterHanlde} />
  );
}

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
