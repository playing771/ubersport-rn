import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import withTouch from '../../components/hocs/WIthTouch';
import withSubmitModal from '../../components/hocs/WithSubmitModal';

import {
  LEAVE_GAME_GQL,
  LeaveGameMutationVariables
} from '../../api/games/leaveGameMutation';
import SubmitButton from '../../components/SubmitButton';

interface IProps {
  gameId: string;
  participantId: string;
  openProfileHandle: (id: string) => void;
  kickParticipantHandle: () => void;
  isAuthor: boolean;
}

const SelectionItem = withTouch(
  ({ title, deleteBtn = false }: { title: string; deleteBtn?: boolean }) => {
    return (
      <Text style={[styles.itemText, deleteBtn ? styles.deleteBtn : undefined]}>
        {title}
      </Text>
    );
  }
);

const SelectionItemWithSubmit = withSubmitModal(SelectionItem);

const ModalWithControls = ({
  participantId,
  openProfileHandle,
  kickParticipantHandle,
  isAuthor,
  gameId
}: IProps) => {
  const variables: LeaveGameMutationVariables = {
    userId: participantId,
    gameId
  };

  console.log('variables', variables);

  return (
    <View style={styles.modal}>
      <Text style={styles.header}>Выберите действие</Text>
      <SelectionItem
        itemId={participantId}
        title="Открыть профиль"
        wrapperStyle={styles.item}
        onPress={openProfileHandle}
      />
      {isAuthor && (
        <SubmitButton
          gql={LEAVE_GAME_GQL}
          variables={variables}
          title="Исключить участника"
          // onUpdate={onUpdate}s
          renderBtn={mutate => (
            <SelectionItemWithSubmit
              title="Исключить участника"
              onSubmit={() => {
                kickParticipantHandle();
                mutate({ variables });
              }}
              wrapperStyle={styles.item}
              submitText="Исключить участника"
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 18,
    paddingVertical: 10
  },
  itemText: {
    color: '#6F6F6F',
    fontWeight: '700',
    fontSize: 14
  },
  header: {
    color: '#5F6B8D',
    paddingVertical: 12,
    paddingBottom: 18,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left'
  },
  item: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12
  },
  deleteBtn: {
    color: '#e57373'
  }
});

export default ModalWithControls;
