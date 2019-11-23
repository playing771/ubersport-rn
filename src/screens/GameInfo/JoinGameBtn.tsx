import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { JoinGameMutationVariables, JOIN_GAME_GQL } from '../../api/games/joinGameMutation';
import { SubmitButton } from '../../components/buttons/SubmitButton';
import withErrorCard from '../../components/hocs/WithErrorCard';
import { useErrorCard } from '../../components/hocs/WithErrorCard/useErrorCard';
import useAuthCheck from '../../hooks/useAuthCheck';
import useNavigation from '../../hooks/useNavigation';
import { NavigationRoot } from '../../navigation/roots';

interface IProps {
  variables: JoinGameMutationVariables;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const SubmitButtonWithErrorCard = withErrorCard(SubmitButton);

export function JoinGameBtn({ variables, disabled, style }: IProps) {
  const { authCheck } = useAuthCheck();
  const { navigate } = useNavigation();
  const { error, toggleErrorCard } = useErrorCard();

  return (
    <SubmitButtonWithErrorCard
      gql={JOIN_GAME_GQL}
      variables={variables}
      title="Участвовать"
      // onUpdate={onUpdate}
      onError={toggleErrorCard}
      style={[styles.mainContainer, style]}
      disabled={disabled}
      error={error}
      refetchQueries={['getGamesWithFilters']}
      onPress={authCheck() ? undefined : () => navigate(NavigationRoot.NotAuthorized)}
    />
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // bottom: (isIphoneX() ? BOTTOM_BIG_NOTCH : BOTTOM_SM_NOTCH) + 13,
  },
});
