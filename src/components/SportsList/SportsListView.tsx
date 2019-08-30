import React from 'react';
import ISport from '../../api/sports/Sport.type';
import ULoader from '../ULoader';
import ToggleableItem from '../ToggleableItem';
import { FlatList } from 'react-native-gesture-handler';
import { StyleProp, TextStyle, StyleSheet } from 'react-native';
import { ISportsListProps } from '.';

interface IProps extends Omit<ISportsListProps, 'exclude'> {
  selectedSports: number[];
  sports: ISport[];
  loading?: boolean;
  onChangeHandle: (selectedId: number) => void;
}

export default function SportsListView({
  sports,
  style,
  selectedSports,
  loading,
  selectionLimit,
  itemStyle,
  itemTextStyle,
  itemNonSelectedTextStyle,
  onChangeHandle,
}: IProps) {
  const renderItem = ({ item }: { item: ISport }) => {
    const active = selectedSports.some(si => item.id === si);
    const exceedMaximum = selectionLimit && selectionLimit === selectedSports.length;

    const onPressHandle = (itemId: number) => {
      // отменяем, если превышен selection-лимит
      // активные элементы всегда нажимаются
      if (exceedMaximum && !active) {
        return;
      } else {
        onChangeHandle(itemId);
      }
    };

    if (loading) {
      return <ULoader />;
    }

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
        {item.name} {item.id}
      </ToggleableItem>
    );
  };

  return (
    <FlatList
      style={style}
      data={sports}
      // extraData={exclude.length}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
}

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
