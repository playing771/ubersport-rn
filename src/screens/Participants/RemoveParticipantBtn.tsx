import * as React from 'react';
import {
  LeaveGameMutationVariables,
  LEAVE_GAME_GQL
} from '../../api/games/leaveGameMutation';
import SubmitButton from '../../components/SubmitButton';
import {
  ILeaveGameResult,
  GameStatus,
  IGetActiveUserGamesResult
} from '../../api/games/types';
import UButton from '../../components/UButton';
import withSubmitModal from '../../components/hocs/WithSubmitModal';
import { StyleSheet } from 'react-native';
import { GET_USER_ACTIVE_GAMES_GQL } from '../../api/games/getUserActiveGames';

type Props = {
  variables: LeaveGameMutationVariables;
  disabled?: boolean;
};

const UButtonWithSubmit = withSubmitModal(UButton);

const RemoveParticipantBtn: React.FC<Props> = ({ variables, disabled }) => {
  const onUpdate = (
    cache: any,
    { data: { leaveGame } }: { data: ILeaveGameResult }
  ) => {
    try {
      const queryVariables = {
        participantsIds: [variables.userId],
        status: GameStatus.Pending
      };
      const getActiveUserGamesResult: IGetActiveUserGamesResult = cache.readQuery(
        {
          query: GET_USER_ACTIVE_GAMES_GQL,
          variables: queryVariables
        }
      );
      const { games } = getActiveUserGamesResult;
      // const { games, count } = getGames;
      const updatedGames = games.games.filter(g => g.id !== leaveGame.id);
      const updatedCount = games.count - 1;
      games.games = updatedGames;
      games.count = updatedCount;
      cache.writeQuery({
        query: GET_USER_ACTIVE_GAMES_GQL,
        variables: queryVariables,
        data: getActiveUserGamesResult
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SubmitButton
      gql={LEAVE_GAME_GQL}
      variables={variables}
      title="Отменить"
      onUpdate={onUpdate}
      renderBtn={mutate => (
        <UButtonWithSubmit
          icon="ios-remove-circle"
          iconColor="#ef5350"
          iconSize={32}
          style={styles.btn}
          backgroundColor="transparent"
          onSubmit={() => mutate({ variables })}
          submitText="Исключить участника"
        />
      )}
    />
  );
};

export default RemoveParticipantBtn;

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: '#f3f3f3',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
  }
});
