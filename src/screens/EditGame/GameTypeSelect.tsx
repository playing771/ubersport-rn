import React from 'react';
import { NavigationRoot } from '../../navigation/roots';
import useNavigation from '../../hooks/useNavigation';
import withHeaderLessScreen from '../../components/hocs/withHeaderlessScreen';
import SportsSelect from '../../components/SportsList/SportsSelect';

interface IProps {}

const GameTypeSelect = withHeaderLessScreen(ScreenContent, 'Какую игру вы хотите создать?', {
  contentStyle: { backgroundColor: '#FAFAFA' },
});

function ScreenContent(props: IProps) {
  const { navigate } = useNavigation();
  // const useAvaliableSp

  const chooseHandle = (sportIds: number[]) => {
    navigate(NavigationRoot.EditGame, { sport: sportIds[0] });
  };

  return (
    <SportsSelect mode="SINGLE" initialSelection={[]} changeSportFilterHanlde={chooseHandle} />
  );
}

export default GameTypeSelect;
