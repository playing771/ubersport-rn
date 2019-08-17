import * as React from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { IEditGameResult } from '../../api/games/types';
import { NavigationRoot } from '../../navigation/roots';
import SubmitButton from '../../components/SubmitButton';
import {
  EditGameMutationVariables,
  EDIT_GAME_GQL
} from '../../api/games/editGameMutation';
import handleApoloError from '../../other/handleApoloError';

interface Props {
  variables: EditGameMutationVariables;
  disabled?: boolean;
}

const EditGameBtn: React.FC<Props & NavigationInjectedProps> = ({
  variables,
  disabled,
  navigation
}) => {
  const onComplete = (data: IEditGameResult) => {
    navigation.navigate(NavigationRoot.GameInfo, {
      gameId: data.editGame.id
    });
  };

  return (
    <SubmitButton
      gql={EDIT_GAME_GQL}
      title="Опубликовать изменения"
      variables={variables}
      onComplete={onComplete}
      onError={handleApoloError}
      disabled={disabled}
      refetchQueries={['getUserActiveGames']} // TODO: change to using apolo cache
    />
  );
};

export default withNavigation(EditGameBtn);
