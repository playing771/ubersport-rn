import React from 'react';
import UButton from '../../components/UButton';
import withSubmitModal from '../../components/hocs/WithSubmitModal';
import { StyleSheet } from 'react-native';
import { useLeaveGameMutation, ILeaveGameVariables } from '../GameInfo/gql';

interface IProps {
  variables: ILeaveGameVariables;
  disabled?: boolean;
}

const UButtonWithSubmit = withSubmitModal(UButton);

export default function RemoveParticipantBtn({ variables, disabled }: IProps) {
  const [leaveGame, { loading, error }] = useLeaveGameMutation();

  const kickBtnPressHandle = () => {
    leaveGame({ variables });
  };
  // const onUpdate = (cache: any, { data: { leaveGame } }: { data: ILeaveGameResult }) => {
  //   try {
  //     const queryVariables = {
  //       participantsIds: [variables.userId],
  //       status: GameStatus.Pending,
  //     };
  //     const getActiveUserGamesResult: IGetActiveUserGamesResult = cache.readQuery({
  //       query: GET_USER_ACTIVE_GAMES_GQL,
  //       variables: queryVariables,
  //     });
  //     const { games } = getActiveUserGamesResult;
  //     // const { games, count } = getGames;
  //     const updatedGames = games.games.filter(g => g.id !== leaveGame.id);
  //     const updatedCount = games.count - 1;
  //     games.games = updatedGames;
  //     games.count = updatedCount;
  //     cache.writeQuery({
  //       query: GET_USER_ACTIVE_GAMES_GQL,
  //       variables: queryVariables,
  //       data: getActiveUserGamesResult,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <UButtonWithSubmit
      icon="ios-remove-circle"
      iconColor="#ef5350"
      iconSize={32}
      style={styles.btn}
      backgroundColor="transparent"
      onSubmit={kickBtnPressHandle}
      submitText="Исключить участника"
    />
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
});
