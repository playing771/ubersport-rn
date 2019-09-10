import React from 'react';
import { NavigationRoot } from '../../navigation/roots';
import useNavigation from '../../hooks/useNavigation';
import withHeaderLessScreen from '../../components/hocs/withHeaderlessScreen';
import SportsSelect from '../../components/SportsList/SportsSelect';
import useAuthCheck from '../../hooks/useAuthCheck';
import sharedStyles, { BASE_PADDING } from '../../sharedStyles';
import { View } from 'react-native';

interface IProps {}

export default function GameTypeSelectScreen(props: IProps) {
  const { navigate } = useNavigation();
  const { authCheck } = useAuthCheck();

  const chooseHandle = (sportId: number) => {
    navigate(NavigationRoot.EditGame, { sportId });
  };

  return (
    authCheck('redirect') && (
      <View style={{ paddingTop: BASE_PADDING / 2, flex: 1, backgroundColor: '#FAFAFA' }}>
        <SportsSelect mode="SINGLE" changeSportFilterHanlde={chooseHandle} />
      </View>
    )
  );
}

GameTypeSelectScreen.navigationOptions = {
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
