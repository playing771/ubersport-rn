import React from 'react';
import { StyleSheet } from 'react-native';
import UButton from '../../components/buttons/UButton';
import withSubmitModal from '../../components/hocs/WithSubmitModal';
import { ILeaveGameVariables, useLeaveGameMutation } from '../GameInfo/gql';

interface IProps {
  variables: ILeaveGameVariables;
  disabled?: boolean;
  onResolve?: () => void;
}

const UButtonWithSubmit = withSubmitModal(UButton);

export function RemoveParticipantBtn({ variables, onResolve, disabled }: IProps) {
  const [leaveGame, { loading, error, data }] = useLeaveGameMutation();
  if (error && onResolve) {
    onResolve();
    // console.log(handleApoloError(error));
  }

  if (data && onResolve) {
    console.log('RemoveParticipantBtn', data);
    onResolve();
  }

  const kickBtnPressHandle = () => {
    leaveGame({ variables });
  };

  return (
    <UButtonWithSubmit
      icon="ios-remove-circle"
      iconColor="#ef5350"
      iconSize={32}
      style={styles.btn}
      backgroundColor="transparent"
      onSubmit={kickBtnPressHandle}
      submitText="Исключить участника"
      loading={loading}
    />
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
});
