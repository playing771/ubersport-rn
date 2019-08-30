import React, { useState } from 'react';

import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import ISport from '../../api/sports/Sport.type';

import ULoader from '../ULoader/index';
import useAvaliableSportsQuery from '../../api/sports/useAvaliableSportsQuery';
import ErrorGqlCard from '../ErrorCard/ErrorGqlCard';
import SportsListInner from './SportsListInner';
import useFavouriteSportsQuery from './gql';
import useAppContext from '../../hooks/useAppContext';

interface IStyleProps {
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  itemNonSelectedTextStyle?: StyleProp<TextStyle>;
}

export interface ISportsListProps extends IStyleProps {
  exclude?: ISport[];
  // selectedItems?: number[];
  onChange?: (selected: number[]) => void;
  loading?: boolean;
  selectionLimit?: number;
  initialValues?: number[];
}
// ISportsListProps
const FavouriteSportsList = (props: ISportsListProps) => {
  const { user } = useAppContext();
  const { data, loading, error } = useFavouriteSportsQuery({ id: user.id });

  if (error) {
    return <ErrorGqlCard error={error} />;
  }

  if (loading) {
    return <ULoader />;
  }

  return <SportsListInner {...props} sports={data.getFavouriteSports.favoriteSports} />;
};

export default FavouriteSportsList;
