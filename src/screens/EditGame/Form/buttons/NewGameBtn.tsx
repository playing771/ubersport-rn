import React from 'react';
import { ViewStyle } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import {
  CreateGameMutationVariables,
  CREATE_GAME_GQL,
} from '../../../../api/games/createGameMutation';
import { EditGameMutationVariables } from '../../../../api/games/editGameMutation';
import { ICreateGameResult } from '../../../../api/games/types';
import { SubmitButton } from '../../../../components/buttons/SubmitButton';
import withErrorCard from '../../../../components/hocs/WithErrorCard';
import { useErrorCard } from '../../../../components/hocs/WithErrorCard/useErrorCard';
import useNavigation from '../../../../hooks/useNavigation';
import { NavigationRoot } from '../../../../navigation/roots';

interface IProps {
  variables: CreateGameMutationVariables | EditGameMutationVariables;
  disabled?: boolean;
  style?: ViewStyle;
}

const SubmitButtonWithErrorCard = withErrorCard(SubmitButton);

export function NewGameBtn({ variables, disabled, style }: IProps) {
  const { error, toggleErrorCard } = useErrorCard();
  const { navigate, dispatch } = useNavigation();

  function onComplete(data: ICreateGameResult) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: NavigationRoot.ChooseGameType,
          params: {
            gameId: data.createGame.id,
          },
        }),
      ],
    });

    dispatch(resetAction);
    navigate(NavigationRoot.GameInfo, {
      gameId: data.createGame.id,
    });
  }

  return (
    <SubmitButtonWithErrorCard
      style={style}
      gql={CREATE_GAME_GQL}
      title="Опубликовать"
      variables={variables}
      onComplete={onComplete}
      onError={toggleErrorCard}
      disabled={disabled}
      error={error}
      refetchQueries={['getGamesWithFilters']} // TODO: change to using apolo cache
    />
  );
}
