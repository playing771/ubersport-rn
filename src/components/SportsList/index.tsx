import React from 'react';

import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import ISport from '../../api/sports/Sport.type';
import useAvaliableSportsQuery from '../../api/sports/useAvaliableSportsQuery';
import ErrorGqlCard from '../ErrorCard/ErrorGqlCard';
import SportsListInner from './SportsListInner';
import onlyUniqFromArrays from '../../utils/onlyUniqsFromArrays';

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
    return <ErrorGqlCard error={error} />;
  }

  const uniqSports = onlyUniqFromArrays(data.sports, exclude);

  return <SportsListInner {...props} sports={uniqSports} loading={loading} />;
};

export default SportsList;
