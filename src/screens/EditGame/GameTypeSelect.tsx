import React from 'react';
import { View } from 'react-native';
import { NavigationStackOptions } from 'react-navigation-stack';
import SportsSelect from '../../components/SportsList/SportsSelect';
import useAuthCheck from '../../hooks/useAuthCheck';
import useNavigation from '../../hooks/useNavigation';
import { NavigationRoot } from '../../navigation/roots';
import sharedStyles, { BASE_PADDING } from '../../sharedStyles';

interface IProps {}

export default function GameTypeSelectScreen(props: IProps) {
  const { navigate } = useNavigation();
  const { authCheck } = useAuthCheck();

  const chooseHandle = (sportId: number | number[]) => {
    navigate(NavigationRoot.EditGame, { sportId });
  };

  return authCheck('redirect') ? (
    <View style={{ paddingTop: BASE_PADDING / 2, flex: 1, backgroundColor: '#FAFAFA' }}>
      <SportsSelect mode="SINGLE" changeSportFilterHanlde={chooseHandle} />
    </View>
  ) : null;
}

const headerOptions: NavigationStackOptions = {
  title: 'Выберите спорт',
  headerTitleStyle: {
    textAlign: 'center',
    flex: 1,
  },
  headerStyle: {
    backgroundColor: '#FAFAFA',
    ...sharedStyles.borderLessHeader,
  },
};

GameTypeSelectScreen.navigationOptions = headerOptions;
