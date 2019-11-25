import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ISportsListProps } from '.';
import ISport from '../../api/sports/Sport.type';
import Colors from '../../constants/Colors';
import ULoader from '../ULoader';
import ToggleableItem, { SporstListItem, SporstListItemInner } from './SportsListItem';
import { ISelectionMode } from './SportsSelect';

export const DEFAULT_SELECTION_MODE: ISelectionMode = 'MULTIPLE';
interface IProps extends Omit<ISportsListProps, 'exclude'> {
  selectedSports: number[];
  sports: ISport[];
  loading?: boolean;
  onChangeHandle: (selectedId: number) => void;
  mode?: ISelectionMode;
}

export default function SportsListView({
  sports = [],
  style,
  selectedSports,
  loading,
  selectionLimit,
  itemStyle,
  itemTextStyle,
  itemNonSelectedTextStyle,
  onChangeHandle,
  mode = DEFAULT_SELECTION_MODE,
}: IProps) {
  const renderItem = ({ item }: { item: ISport }) => {
    const active = selectedSports.some(si => item.id === si);
    const exceedMaximum = (selectionLimit && selectionLimit === selectedSports.length) || false;

    const onPressHandle = (itemId: number) => {
      // отменяем, если превышен selection-лимит
      // активные элементы всегда нажимаются
      if (exceedMaximum && !active) {
        return;
      } else {
        onChangeHandle(itemId);
      }
    };

    // 2 варианта элемента: обычная кнопки или toggle-кнопка с иконкой
    return mode === 'MULTIPLE' ? (
      <ToggleableItem
        key={item.id}
        active={active}
        style={[styles.item, itemStyle]}
        activeTextStyle={{ color: Colors.active }}
        textStyle={getStyle(active, exceedMaximum, itemTextStyle, itemNonSelectedTextStyle)}
        onPress={onPressHandle}
        itemId={item.id}
        indicatorStyle={styles.indicator}
      >
        {item.name}
      </ToggleableItem>
    ) : (
      <SporstListItem
        key={item.id}
        style={[styles.item, itemStyle]}
        onPress={onPressHandle}
        itemId={item.id}
        textStyle={styles.itemText}
      >
        {item.name}
      </SporstListItem>
    );
  };

  if (loading) {
    return <ULoader position="LEFT" />;
  }

  return sports.length ? (
    <FlatList
      style={style}
      data={sports}
      // extraData={exclude.length}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  ) : (
    <SporstListItemInner textStyle={{ color: '#B7B7B7', fontSize: 16 }}>Пусто</SporstListItemInner>
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
