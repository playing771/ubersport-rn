import { LocationData } from 'expo-location';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import ToggleableItem, { SporstListItemInner } from '../../../components/SportsList/SportsListItem';
import UModal from '../../../components/UModal';
import Colors from '../../../constants/Colors';
import { SortType } from '../../../utils/types';

interface IProps {
  onChange: (itemId: SortType) => void;
  activeSort: SortType;
  myLocation?: LocationData;
}

const SortModal = (props: IProps) => {
  return (
    <UModal>
      <Text style={styles.header}>Сортировка</Text>
      {props.myLocation ? (
        <ToggleableItem
          onPress={props.onChange}
          itemId="distance"
          active={props.activeSort === 'distance'}
        >
          Ближайшие
        </ToggleableItem>
      ) : (
        <SporstListItemInner textStyle={{ color: 'grey', fontWeight: '300' }}>
          Ближайшие
        </SporstListItemInner>
      )}
      <ToggleableItem onPress={props.onChange} itemId="time" active={props.activeSort === 'time'}>
        Скоро начало
      </ToggleableItem>
      <ToggleableItem onPress={props.onChange} itemId="date" active={props.activeSort === 'date'}>
        Новые
      </ToggleableItem>
    </UModal>
  );
};

const styles = StyleSheet.create({
  header: {
    color: '#667286',
    paddingVertical: 12,
    paddingBottom: 18,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  item: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemText: {
    color: '#667286',
    fontWeight: '700',
    fontSize: 14,
  },
  itemIcon: {
    marginLeft: 'auto',
  },
  active: {
    color: Colors.active,
  },
});

export default SortModal;
