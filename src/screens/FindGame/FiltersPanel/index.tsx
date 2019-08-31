import React from 'react';
import { View, StyleSheet } from 'react-native';
import FilterButton from './FilterButton';
import SortModal from './sortModal';
import { ISearchGameSort } from '../../FindGame';
import withModal from '../../../components/hocs/WithModal';
import { NavigationRoot } from '../../../navigation/roots';
import useNavigation from '../../../hooks/useNavigation';

const sortValues: { [key in ISearchGameSort]: string } = {
  date: 'Новые',
  distance: 'Ближайшие',
  time: 'Скоро начало',
};

interface IProps {
  activeSort: ISearchGameSort;
  onChangeActiveSort: (sort: ISearchGameSort, toggleModal: () => void) => void;
  changeSportFilterHanlde: (ids: number[]) => void;
  activeFilters: { sportIds?: number[] };
}

const FilterButtonWithModal = withModal(FilterButton);

export default function FiltersPanel(props: IProps) {
  const { navigate } = useNavigation();

  const filtersNavigateHandle = () => {
    navigate(NavigationRoot.SportFilters, {
      changeSportFilterHanlde: props.changeSportFilterHanlde,
      activeFilters: props.activeFilters,
    });
  };

  return (
    <View style={styles.container}>
      <FilterButton
        style={styles.buttonLeft}
        title="Спорт"
        value="2 вида"
        onPress={filtersNavigateHandle}
      />
      <FilterButtonWithModal
        wrapperStyle={styles.buttonRight}
        title="Сортировка"
        value={sortValues[props.activeSort]}
        modal={({ toggleModal }) => (
          <SortModal
            activeSort={props.activeSort}
            onChange={sort => props.onChangeActiveSort(sort, toggleModal)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonLeft: { flex: 1, alignItems: 'flex-start', paddingLeft: 12 },
  buttonRight: { flex: 1, alignItems: 'flex-end', paddingRight: 12 },
});
