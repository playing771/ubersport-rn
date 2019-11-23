import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import RoundButton from '../../components/buttons/RoundButton';
import withSubmitModal from '../../components/hocs/WithSubmitModal';
import useAppContext from '../../hooks/useAppContext';
import { useLeaveGameMutation } from './gql';

interface IProps {
  gameId: string;
}

const LeaveGameButtonWithSubmitModal = withSubmitModal(RoundButton);

export function LeaveGameBtn({ gameId }: IProps) {
  const { user } = useAppContext();
  const [leaveGame, { loading, error }] = useLeaveGameMutation();

  const leaveGameHandle = () => {
    // leaveGame({ variables: { gameId, userId: user.id } });
    leaveGame({ variables: { gameId: '3343', userId: '343' } });
  };

  return (
    <LeaveGameButtonWithSubmitModal
      backgroundColor="#F7F5F3"
      icon="ios-log-out"
      onSubmit={leaveGameHandle}
      style={styles.leaveGameBtn}
      iconStyle={styles.leaveGameBtnIcon}
      loadingIndicatorColor={Colors.purle}
      loading={loading}
    />
  );
}

const styles = StyleSheet.create({
  leaveGameBtn: { marginLeft: 12, width: 36, height: 36, alignSelf: 'center' },
  leaveGameBtnIcon: { color: Colors.purle, fontSize: 20 },
});
