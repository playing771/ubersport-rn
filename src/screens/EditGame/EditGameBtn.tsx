import React from 'react';
import { EditGameMutationVariables, EDIT_GAME_GQL } from '../../api/games/editGameMutation';
import { IEditGameResult } from '../../api/games/types';
import { SubmitButton } from '../../components/buttons/SubmitButton';
import withErrorCard from '../../components/hocs/WithErrorCard';
import { useErrorCard } from '../../components/hocs/WithErrorCard/useErrorCard';
import useNavigation from '../../hooks/useNavigation';
import { NavigationRoot } from '../../navigation/roots';

interface Props {
  variables: EditGameMutationVariables;
  disabled?: boolean;
}

const SubmitButtonWithErrorCard = withErrorCard(SubmitButton);

export function EditGameBtn({ variables, disabled }: Props) {
  const { error, toggleErrorCard } = useErrorCard();
  const { navigate } = useNavigation();
  console.log('variables', variables);

  {
    const onComplete = (data: IEditGameResult) => {
      navigate(NavigationRoot.GameInfo, {
        gameId: data.editGame.id,
      });
    };

    return (
      <SubmitButtonWithErrorCard
        gql={EDIT_GAME_GQL}
        title="Опубликовать изменения"
        variables={variables}
        onComplete={onComplete}
        onError={toggleErrorCard}
        disabled={disabled}
        // refetchQueries={['getUserActiveGames']} // TODO: change to using apolo cache
        error={error}
      />
    );
  }
}
