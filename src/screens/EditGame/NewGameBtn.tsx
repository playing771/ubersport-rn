import * as React from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { CreateGameMutationVariables, CREATE_GAME_GQL } from '../../api/games/createGameMutation';
import { ICreateGameResult } from '../../api/games/types';
import { NavigationRoot } from '../../navigation/roots';

import { EditGameMutationVariables } from '../../api/games/editGameMutation';
import handleApoloError from '../../utils/handleApoloError';
import SubmitButton from '../../components/buttons/SubmitButton';

interface Props {
  variables: CreateGameMutationVariables | EditGameMutationVariables;
  disabled?: boolean;
}

const NewGameBtn: React.FC<Props & NavigationInjectedProps> = ({
  variables,
  disabled,
  navigation,
}) => {
  const onComplete = (data: ICreateGameResult) => {
    navigation.navigate(NavigationRoot.GameInfo, {
      gameId: data.createGame.id,
    });
  };

  return (
    <SubmitButton
      gql={CREATE_GAME_GQL}
      title="Опубликовать"
      variables={variables}
      onComplete={onComplete}
      onError={handleApoloError}
      disabled={disabled}
      refetchQueries={['getUserActiveGames']} // TODO: change to using apolo cache
    />
  );
};

export default withNavigation(NewGameBtn);
