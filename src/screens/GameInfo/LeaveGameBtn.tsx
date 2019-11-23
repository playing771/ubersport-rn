import React from 'react';
import { StyleSheet } from 'react-native';
import RoundButton from '../../components/buttons/RoundButton';
import withErrorCard from '../../components/hocs/WithErrorCard';
import withSubmitModal from '../../components/hocs/WithSubmitModal';
import Colors from '../../constants/Colors';
import useAppContext from '../../hooks/useAppContext';
import { useLeaveGameMutation } from './gql';

interface IProps {
  gameId: string;
}

const Button = withErrorCard(withSubmitModal(RoundButton));

export function LeaveGameBtn({ gameId }: IProps) {
  const { user } = useAppContext();
  const [leaveGame, { loading, error }] = useLeaveGameMutation();

  const leaveGameHandle = () => {
    leaveGame({ variables: { gameId, userId: user.id }, refetchQueries: ['getGamesWithFilters'] });
  };

  return (
    <Button
      backgroundColor="#F7F5F3"
      icon="ios-log-out"
      onSubmit={leaveGameHandle}
      style={styles.leaveGameBtn}
      iconStyle={styles.leaveGameBtnIcon}
      loadingIndicatorColor={Colors.purle}
      loading={loading}
      error={error}
    />
  );
}

const styles = StyleSheet.create({
  leaveGameBtn: { marginLeft: 12, width: 36, height: 36, alignSelf: 'center' },
  leaveGameBtnIcon: { color: Colors.purle, fontSize: 20 },
});
