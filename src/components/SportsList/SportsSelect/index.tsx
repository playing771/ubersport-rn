import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import useAvaliableSportsQuery from '../../../api/sports/useAvaliableSportsQuery';
import useAppContext from '../../../hooks/useAppContext';
import useAuthCheck from '../../../hooks/useAuthCheck';
import onlyUniqFromArrays from '../../../utils/onlyUniqsFromArrays';
import ErrorCard from '../../ErrorCard';
import useFavouriteSportsQuery from '../gql';
import SportsListView from '../SportsListView';
import Header from './Header';

export type ISelectionMode = 'MULTIPLE' | 'SINGLE';
interface IProps {
  initialSelection?: number[];
  changeSportFilterHanlde: (sports: number[] | number) => void;
  mode?: ISelectionMode;
}

export default function SportsSelect({
  initialSelection = [],
  changeSportFilterHanlde,
  mode,
}: IProps) {
  const { user } = useAppContext();
  const { authCheck } = useAuthCheck();

  // если пользрователь неавторизован, не запрашиваем favourite sports
  const { data: fData, loading: fLoading, error: fError } = useFavouriteSportsQuery({
    id: user.id,
  });

  const { data: aData, loading: aLoading, error: aErrror } = useAvaliableSportsQuery();
  const [selected, setSelected] = useState<number[]>(initialSelection); // TODO: remove state?

  const toggleSelection = (id: number) => {
    if (mode === 'SINGLE') {
      // setSelected(id);
      changeSportFilterHanlde(id);
    } else {
      const newSelected =
        selected.indexOf(id) === -1 ? [...selected, id] : selected.filter(sel => sel !== id);

      setSelected(newSelected);
      changeSportFilterHanlde(newSelected);
    }
  };

  if (fError || aErrror) {
    return <ErrorCard error={fError || aErrror} />;
  }

  const loading = aLoading && fLoading;

  const sportsList = onlyUniqFromArrays(
    aData.sports,
    fData && fData.getFavouriteSports && fData.getFavouriteSports.favoriteSports
  );

  return (
    <ScrollView style={styles.container}>
      {authCheck() ? (
        <>
          <Header>Избранные виды</Header>
          <SportsListView
            loading={loading}
            selectedSports={selected}
            sports={fData && fData.getFavouriteSports && fData.getFavouriteSports.favoriteSports}
            onChangeHandle={toggleSelection}
            mode={mode}
          />
          <Header>Прочие виды</Header>
        </>
      ) : (
        <Header>Виды спорта</Header>
      )}
      <SportsListView
        loading={loading}
        selectedSports={selected}
        sports={sportsList}
        onChangeHandle={toggleSelection}
        mode={mode}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    // paddingVertical: 12,
    flex: 1,
    paddingHorizontal: 18,
  },
  item: {
    minHeight: 50,
  },
  itemText: {
    fontSize: 16,
  },
});
