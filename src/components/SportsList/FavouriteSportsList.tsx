import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import ISport from '../../api/sports/Sport.type';
import useAppContext from '../../hooks/useAppContext';
import ErrorCard from '../ErrorCard';
import ULoader from '../ULoader/index';
import useFavouriteSportsQuery from './gql';
import SportsListInner from './SportsListInner';

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
    return <ErrorCard error={error} />;
  }

  if (loading) {
    return <ULoader />;
  }

  return <SportsListInner {...props} sports={data.getFavouriteSports.favoriteSports} />;
};

export default FavouriteSportsList;
