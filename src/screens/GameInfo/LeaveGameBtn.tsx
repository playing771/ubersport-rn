import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import {
  LeaveGameMutationVariables,
  LEAVE_GAME_GQL
} from '../../api/games/leaveGameMutation';
import SubmitButton from '../../components/SubmitButton';
4;
import { ILeaveGameResult } from '../../api/games/types';
import { NavigationRoot } from '../../navigation/roots';
import withSubmitModal from '../../components/hocs/WithSubmitModal';
import { withNavigation } from 'react-navigation';
import { isIphoneX } from 'react-native-iphone-x-helper';
import {
  BOTTOM_BIG_NOTCH,
  BOTTOM_SM_NOTCH
} from '../../components/AdaptiveScreen';
import { StyleSheet } from 'react-native';
import UButton from '../../components/UButton';

type Props = {
  variables: LeaveGameMutationVariables;
  disabled?: boolean;
};

const UButtonWithSubmit = withSubmitModal(UButton);

const LeaveGameBtn = ({
  variables,
  disabled,
  navigation
}: Props & Partial<NavigationInjectedProps>) => {
  const onComplete = (data: ILeaveGameResult): void => {
    console.log('COMPLETE leave', data);

    if (navigation) {
      navigation.navigate(NavigationRoot.FindGame, {
        gameId: data.leaveGame.id
      });
    }
  };

  // const onUpdate = (
  //   cache: any,
  //   { data: { leaveGame } }: { data: ILeaveGameResult }
  // ) => {
  //   try {
  //     const queryVariables = {
  //       participantsIds: [variables.userId],
  //       status: GameStatus.Pending
  //     };

  //     const getActiveUserGamesResult: IGetActiveUserGamesResult = cache.readQuery(
  //       {
  //         query: GET_USER_ACTIVE_GAMES_GQL,
  //         variables: queryVariables
  //       }
  //     );
  //     console.log('getActiveUserGamesResult', getActiveUserGamesResult);
  //     const { games } = getActiveUserGamesResult;
  //     // const { games, count } = getGames;

  //     const updatedGames = games.games.filter(g => g.id !== leaveGame.id);
  //     const updatedCount = games.count - 1;
  //     games.games = updatedGames;
  //     games.count = updatedCount;

  //     cache.writeQuery({
  //       query: GET_USER_ACTIVE_GAMES_GQL,
  //       variables: queryVariables,
  //       data: getActiveUserGamesResult
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <SubmitButton
      gql={LEAVE_GAME_GQL}
      variables={variables}
      title="Отменить"
      onComplete={onComplete}
      // onUpdate={onUpdate}
      // style={styles.mainContainer}
      onError={onError}
      textStyle={{ color: '#76706f', fontWeight: '600' }}
      renderBtn={mutate => (
        <UButtonWithSubmit
          style={styles.mainContainer}
          backgroundColor="#e57373"
          title="Покинуть игру"
          textStyle={styles.title}
          onSubmit={() => {
            console.log('SUBMIT', variables);

            mutate({ variables });
          }}
          submitText="Покинуть игру"
          closeOnSubmi={false}
        />
      )}
    />
  );
};

function onError(err: any) {
  console.log('ERROR LEAVE', err);

  if (err.networkError) {
    err.networkError.rsesult!.errors.forEach((networkError: any) => {
      console.log(networkError.message);
    });
  }
  if (err.graphQLErrors) {
    err.graphQLErrors.forEach((gqlError: any) => {
      console.log(gqlError.message);
    });
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: (isIphoneX() ? BOTTOM_BIG_NOTCH : BOTTOM_SM_NOTCH) + 13,
    alignSelf: 'center'
  },
  title: { color: 'white', fontWeight: '600', fontSize: 16 }
});

export default withNavigation(LeaveGameBtn);
