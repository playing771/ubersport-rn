import React from 'react';
import { View, StyleSheet } from 'react-native';
import FilterButton from './FilterButton';
import SortModal from './sortModal';
import { ISearchGameSort, IFindGameFilters } from '../../FindGame';
import withModal from '../../../components/hocs/WithModal';
import { NavigationRoot } from '../../../navigation/roots';
import useNavigation from '../../../hooks/useNavigation';
import useAvaliableSportsQuery from '../../../api/sports/useAvaliableSportsQuery';
import ULoader from '../../../components/ULoader';
import ISport from '../../../api/sports/Sport.type';
import { HEADER_BACKGROUND } from '../../../constants/Colors';

const sortValues: { [key in ISearchGameSort]: string } = {
  date: 'Новые',
  distance: 'Ближайшие',
  time: 'Скоро начало',
};

interface IProps {
  activeSort: ISearchGameSort;
  onChangeActiveSort: (sort: ISearchGameSort, toggleModal: () => void) => void;
  changeSportFilterHanlde: (ids: number[]) => void;
  activeFilters: IFindGameFilters;
}

const FilterButtonWithModal = withModal(FilterButton);

export default function FiltersPanel({
  changeSportFilterHanlde,
  activeFilters,
  activeSort,
  onChangeActiveSort,
}: IProps) {
  const { navigate } = useNavigation();
  const { data, loading, error } = useAvaliableSportsQuery();

  const filtersNavigateHandle = () => {
    navigate(NavigationRoot.SportFilters, {
      changeSportFilterHanlde: changeSportFilterHanlde,
      activeFilters: activeFilters,
    });
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <FilterButton
          style={styles.buttonLeft}
          title="Спорт"
          value={getFilterText(activeFilters, data.sports)}
          onPress={filtersNavigateHandle}
        />
      ) : (
        <ULoader></ULoader>
      )}
      <FilterButtonWithModal
        wrapperStyle={styles.buttonRight}
        title="Сортировка"
        value={sortValues[activeSort]}
        modal={({ toggleModal }) => (
          <SortModal
            activeSort={activeSort}
            onChange={sort => onChangeActiveSort(sort, toggleModal)}
          />
        )}
      />
    </View>
  );
}

function getFilterText(filter: IFindGameFilters, sports: ISport[]): string {
  if (!filter.sportIds || filter.sportIds.length === 0) {
    return 'не выбрано';
  }

  if (filter.sportIds.length === 1) {
    return sports.find(sport => sport.id === filter.sportIds[0]).name;
  }

  if (filter.sportIds.length === 2) {
    return filter.sportIds.map(sportId => sports.find(sp => sp.id === sportId).name).join(', ');
  }

  if (filter.sportIds.length > 2) {
    return (
      filter.sportIds
        .slice(0, 1)
        .map(sportId => sports.find(sp => sp.id === sportId).name)
        .join(', ') + ` и еще ${filter.sportIds.length - 1} других`
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    // paddingTop: 10,
    backgroundColor: HEADER_BACKGROUND,
  },
  buttonLeft: { flex: 1, alignItems: 'flex-start', paddingLeft: 12 },
  buttonRight: { flex: 1, alignItems: 'flex-end', paddingRight: 12 },
});
