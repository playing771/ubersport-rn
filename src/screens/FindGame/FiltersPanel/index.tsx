import React from 'react';
import { StyleSheet, View } from 'react-native';
import ISport from '../../../api/sports/Sport.type';
import useAvaliableSportsQuery from '../../../api/sports/useAvaliableSportsQuery';
import { withModal } from '../../../components/hocs/WithModal';
import ULoader from '../../../components/ULoader';
import { HEADER_BACKGROUND } from '../../../constants/Colors';
import useNavigation from '../../../hooks/useNavigation';
import { NavigationRoot } from '../../../navigation/roots';
import { ObjectMap, SortType } from '../../../utils/types';
import { IFindGameFilters } from '../../FindGame';
import FilterButton from './FilterButton';
import SortModal from './sortModal';

const SORTS: ObjectMap<string, SortType> = {
  date: 'Новые',
  distance: 'Ближайшие',
  time: 'Скоро начало',
};

interface IProps {
  activeSort: SortType;
  onChangeActiveSort: (sort: SortType, toggleModal: () => void) => void;
  changeSportFilterHanlde: (ids: number[]) => void;
  activeFilters: IFindGameFilters;
  myLocation?: Position;
}

const FilterButtonWithModal = withModal(FilterButton);

export default function FiltersPanel({
  changeSportFilterHanlde,
  activeFilters,
  activeSort,
  onChangeActiveSort,
  myLocation,
}: IProps) {
  const { navigate } = useNavigation();
  const { data, loading, error } = useAvaliableSportsQuery();

  if (!data) {
    return null;
  }

  const { distance, ...rest } = SORTS;
  const sortingMap = myLocation ? { ...rest, distance } : { ...rest };

  const filtersNavigateHandle = () => {
    navigate(NavigationRoot.SportFilters, {
      changeSportFilterHanlde,
      activeFilters,
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
        <ULoader />
      )}
      <FilterButtonWithModal
        wrapperStyle={styles.buttonRight}
        title="Сортировка"
        value={sortingMap[activeSort]}
        modal={({ closeModal }) => (
          <SortModal
            activeSort={activeSort}
            onChange={sort => onChangeActiveSort(sort, closeModal)}
            myLocation={myLocation}
            // options={options}
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
    height: 65,
    flexDirection: 'row',
    // paddingTop: 10,
    backgroundColor: HEADER_BACKGROUND,
  },
  buttonLeft: { flex: 1, alignItems: 'flex-start', paddingLeft: 12 },
  buttonRight: { flex: 1, alignItems: 'flex-end', paddingRight: 12 },
});
