import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import ISport from '../../api/sports/Sport.type';
import useAvaliableSportsQuery from '../../api/sports/useAvaliableSportsQuery';
import onlyUniqFromArrays from '../../utils/onlyUniqsFromArrays';
import ErrorCard from '../ErrorCard';
import ULoader from '../ULoader';
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
const SportsList = ({ exclude = [], ...props }: ISportsListProps) => {
  const { data, loading, error } = useAvaliableSportsQuery();

  if (error) {
    return <ErrorCard error={error} />;
  }

  if (!data) {
    return <ULoader />;
  }

  const uniqSports = onlyUniqFromArrays(data.sports, exclude);

  return <SportsListInner {...props} sports={uniqSports} loading={loading} />;
};

export default SportsList;
