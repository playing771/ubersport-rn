import React, { useState } from 'react';
import withAvaliableSportsQuery from '../../api/sports/useAvaliableSportsQuery';
import { FlatList } from 'react-native-gesture-handler';
import onlyUniqFromArrays from '../../other/onlyUniqsFromArrays';
import { Text, StyleSheet, StyleProp, ViewStyle, TextStyle, View } from 'react-native';
import ISport from '../../api/sports/Sport.type';
import ToggleableItem from '../ToggleableItem';
import ULoader from '../ULoader/index';
import useAvaliableSportsQuery from '../../api/sports/useAvaliableSportsQuery';
import ErrorGqlCard from '../ErrorCard/ErrorGqlCard';

interface IStyleProps {
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  itemNonSelectedTextStyle?: StyleProp<TextStyle>;
  selectionLimit?: number;
  initialValues?: number[];
}

export interface IProps extends IStyleProps {
  exclude?: ISport[];
  // selectedItems?: number[];
  onChange?: (selected: number[]) => void;
  loading?: boolean;
}

const SportsList = ({
  onChange,
  exclude,
  style,
  itemStyle,
  itemTextStyle,
  itemNonSelectedTextStyle,
  selectionLimit,
  loading,
  initialValues,
}: // selectedItems,
IProps) => {
  const { data, loading: avaliableSportsLoading, error } = useAvaliableSportsQuery();
  const [innerSelectedSports, setInnerSelectedSports] = useState<number[]>(initialValues);

  if (error) {
    return <ErrorGqlCard error={error} />;
  }

  if (avaliableSportsLoading || loading) {
    return <ULoader />;
  }

  const onChangeHandle = (selectedId: number) => {
    const itemIndex = innerSelectedSports.findIndex(sel => sel === selectedId);
    if (itemIndex > -1) {
      innerSelectedSports.splice(itemIndex, 1);
    } else {
      innerSelectedSports.push(selectedId);
    }

    setInnerSelectedSports([...innerSelectedSports]);

    if (onChange) {
      onChange(innerSelectedSports);
    }
  };

  const renderItem = ({ item }: { item: ISport }) => {
    const active = innerSelectedSports.some(si => item.id === si);
    const exceedMaximum = selectionLimit && selectionLimit === innerSelectedSports.length;

    const onPressHandle = (itemId: number) => {
      // отменяем, если превышен selection-лимит
      // активные элементы всегда нажимаются
      if (exceedMaximum && !active) {
        return;
      } else {
        onChangeHandle(itemId);
      }
    };

    return (
      <ToggleableItem
        key={item.id}
        active={active}
        style={[styles.item, itemStyle]}
        textStyle={getStyle(active, exceedMaximum, itemTextStyle, itemNonSelectedTextStyle)}
        onPress={onPressHandle}
        itemId={item.id}
        indicatorStyle={styles.indicator}
      >
        {item.name}
      </ToggleableItem>
    );
  };

  const { sports } = data;

  return (
    <FlatList
      style={style}
      data={exclude ? onlyUniqFromArrays(sports, exclude) : sports}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

const keyExtractor = (item: ISport, index: number) => String(item.id);

const styles = StyleSheet.create({
  item: {
    minHeight: 50,
  },
  itemText: {
    fontSize: 16,
  },
  indicator: { fontSize: 28 },
  loader: { minHeight: 350, alignItems: 'center' },
});

function getStyle(
  active: boolean,
  exceedMaximum: boolean,
  itemTextStyle?: StyleProp<TextStyle>,
  itemNonSelectedTextStyle?: StyleProp<TextStyle>
) {
  const _styles = [styles.itemText, itemTextStyle];
  // если элемент неактивен и лимит превышен, применяем стиль itemNonSelectedTextStyle

  if (!active && exceedMaximum) {
    _styles.push(itemNonSelectedTextStyle);
  }
  return _styles;
}

export default SportsList;
