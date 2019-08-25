import * as React from 'react';

import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { JoinGameMutationVariables, JOIN_GAME_GQL } from '../../api/games/joinGameMutation';

import { IJoinGameResult, GameStatus, IGetActiveUserGamesResult } from '../../api/games/types';
import { GET_USER_ACTIVE_GAMES_GQL } from '../../api/games/getUserActiveGames';
import { ViewStyle, StyleProp, StyleSheet } from 'react-native';
import { BOTTOM_BIG_NOTCH, BOTTOM_SM_NOTCH } from '../../components/AdaptiveScreen/index';
import { isIphoneX } from 'react-native-iphone-x-helper';
import SubmitButton from '../../components/Buttons/SubmitButton';
import useAuthCheck from '../../hooks/useAuthCheck';
import UButton from '../../components/UButton';
import { NavigationRoot } from '../../navigation/roots';

type IProps = {
  variables: JoinGameMutationVariables;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
} & NavigationInjectedProps;

const JoinGameBtn = ({ variables, disabled, navigation, style }: IProps) => {
  const { authCheck } = useAuthCheck();

  const onUpdate = (cache: any, { data: { joinGame } }: { data: IJoinGameResult }) => {
    try {
      const queryVariables = {
        participantsIds: [variables.userId],
        status: GameStatus.Pending,
      };
      const getActiveUserGamesResult: IGetActiveUserGamesResult = cache.readQuery({
        query: GET_USER_ACTIVE_GAMES_GQL,
        variables: queryVariables,
      });

      const { games } = getActiveUserGamesResult;
      const updatedGames = [...games.games];
      const updatedActiveUSerGamesResult: IGetActiveUserGamesResult = {
        games: {
          count: games.count + 1,
          games: updatedGames,
          __typename: 'Games',
        },
      };
      updatedActiveUSerGamesResult.games.games.push(joinGame);

      cache.writeQuery({
        query: GET_USER_ACTIVE_GAMES_GQL,
        variables: queryVariables,
        data: updatedActiveUSerGamesResult,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SubmitButton
      gql={JOIN_GAME_GQL}
      variables={variables}
      title="Участвовать"
      onUpdate={onUpdate}
      onError={onError}
      style={[styles.mainContainer, style]}
      disabled={disabled}
      onPress={authCheck() ? undefined : () => navigation.navigate(NavigationRoot.NotAuthorized)}
    />
  );
};

function onError(err: any) {
  if (err.networkError) {
    err.networkError.result!.errors.forEach((networkError: any) => {
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
    bottom: (isIphoneX() ? BOTTOM_BIG_NOTCH : BOTTOM_SM_NOTCH) + 13,
  },
});

export default withNavigation(JoinGameBtn);
