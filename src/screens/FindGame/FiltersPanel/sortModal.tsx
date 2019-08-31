import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import { ISearchGameSort } from '../../FindGame';
import ToggleableItem from '../../../components/ToggleableItem';
import UModal from '../../../components/UModal';

interface IProps {
  onChange: (itemId: ISearchGameSort) => void;
  activeSort: ISearchGameSort;
}

const SortModal: React.FC<IProps> = props => {
  return (
    <UModal>
      <Text style={styles.header}>Сортировка</Text>
      <ToggleableItem
        onPress={props.onChange}
        itemId="distance"
        active={props.activeSort === 'distance'}
      >
        Ближайшие
      </ToggleableItem>
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
