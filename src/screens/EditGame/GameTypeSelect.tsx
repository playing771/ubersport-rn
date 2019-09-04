import React from 'react';
import { NavigationRoot } from '../../navigation/roots';
import useNavigation from '../../hooks/useNavigation';
import withHeaderLessScreen from '../../components/hocs/withHeaderlessScreen';
import SportsSelect from '../../components/SportsList/SportsSelect';
import useAuthCheck from '../../hooks/useAuthCheck';

interface IProps {}

const GameTypeSelect = withHeaderLessScreen(ScreenContent, 'Какую игру вы хотите создать?', {
  contentStyle: { backgroundColor: '#FAFAFA' },
});

function ScreenContent(props: IProps) {
  const { navigate } = useNavigation();
  const { authCheck } = useAuthCheck();

  const chooseHandle = (sportId: number) => {
    navigate(NavigationRoot.EditGame, { sportId });
  };

  return (
    authCheck('redirect') && <SportsSelect mode="SINGLE" changeSportFilterHanlde={chooseHandle} />
  );
}

export default GameTypeSelect;
