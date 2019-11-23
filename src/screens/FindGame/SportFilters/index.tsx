import React from 'react';
import SportsSelect from '../../../components/SportsList/SportsSelect';
import { defaultHeaderOptions } from '../../../defaultHeaderOptions';
import useNavigation from '../../../hooks/useNavigation';

interface IProps {}

function SportFilters(props: IProps) {
  const { getParam } = useNavigation();

  const sports: number[] = getParam('activeFilters').sportIds || [];
  const changeSportFilterHanlde = getParam('changeSportFilterHanlde');

  return (
    <SportsSelect initialSelection={sports} changeSportFilterHanlde={changeSportFilterHanlde} />
  );
}

SportFilters.navigationOptions = {
  title: 'Информация об игре',
  ...defaultHeaderOptions,
  // headerTransparent: true, // TODO: fix
};

export default SportFilters;
