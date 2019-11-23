import { ApolloError } from 'apollo-client';
import React, { useCallback, useState } from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { EditGameMutationVariables, EDIT_GAME_GQL } from '../../api/games/editGameMutation';
import { IEditGameResult } from '../../api/games/types';
import SubmitButton from '../../components/buttons/SubmitButton';
import withErrorCard from '../../components/hocs/WithErrorCard';
import { NavigationRoot } from '../../navigation/roots';

interface Props extends NavigationInjectedProps {
  variables: EditGameMutationVariables;
  disabled?: boolean;
}

const SubmitButtonWithErrorCard = withErrorCard(SubmitButton);

function EditGameBtn({ variables, disabled, navigation }: Props) {
  const [error, setError] = useState<ApolloError>();
  const handleError = useCallback((err: ApolloError) => setError(err), []);
  console.log('variables', variables);

  {
    const onComplete = (data: IEditGameResult) => {
      navigation.navigate(NavigationRoot.GameInfo, {
        gameId: data.editGame.id,
      });
    };

    return (
      <SubmitButtonWithErrorCard
        gql={EDIT_GAME_GQL}
        title="Опубликовать изменения"
        variables={variables}
        onComplete={onComplete}
        onError={handleError}
        disabled={disabled}
        // refetchQueries={['getUserActiveGames']} // TODO: change to using apolo cache
        error={error}
      />
    );
  }
}

export default withNavigation(EditGameBtn);
