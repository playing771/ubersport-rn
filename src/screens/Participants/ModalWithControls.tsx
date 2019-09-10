import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import withTouch from '../../components/hocs/WIthTouch';
import withSubmitModal from '../../components/hocs/WithSubmitModal';
import { ILeaveGameVariables, useLeaveGameMutation } from '../GameInfo/gql';
import ULoader from '../../components/ULoader';
import Colors from '../../constants/Colors';
import { BASE_PADDING } from '../../sharedStyles';
import ErrorGqlCard from '../../components/ErrorCard/ErrorGqlCard';

interface IProps {
  gameId: string;
  participantId: string;
  openProfileHandle: (id: string) => void;
  kickParticipantHandle: () => void;
  isAuthor: boolean;
}

const TITLE = 'Выберите действие';

const SelectionItem = withTouch(
  ({ title, deleteBtn = false }: { title: string; deleteBtn?: boolean }) => {
    return <Text style={[styles.itemText, deleteBtn ? styles.deleteBtn : undefined]}>{title}</Text>;
  }
);

const SelectionItemWithSubmit = withSubmitModal(SelectionItem);

export default function ModalWithControls({
  participantId,
  openProfileHandle,
  kickParticipantHandle,
  isAuthor,
  gameId,
}: IProps) {
  const variables: ILeaveGameVariables = {
    userId: participantId,
    gameId,
  };

  const [leaveGame, { loading, error }] = useLeaveGameMutation();

  const kickBtnPressHandle = () => {
    kickParticipantHandle();
    leaveGame({ variables });
  };

  return (
    <View style={styles.modal}>
      <Text style={styles.header}>{TITLE}</Text>
      <SelectionItem
        itemId={participantId}
        title="Открыть профиль"
        wrapperStyle={styles.item}
        onPress={openProfileHandle}
      />
      {isAuthor && (
        <View style={styles.itemWithModalWrapper}>
          <SelectionItemWithSubmit
            title="Исключить участника"
            onSubmit={kickBtnPressHandle}
            wrapperStyle={styles.item}
            submitText="Исключить участника"
            deleteBtn={true}
          />
          {loading && <ULoader color={Colors.warningText} style={styles.loader} />}
        </View>
      )}
      <ErrorGqlCard error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  itemText: {
    color: '#6F6F6F',
    fontWeight: '700',
    fontSize: 14,
  },
  header: {
    color: '#5F6B8D',
    paddingVertical: 12,
    paddingBottom: 18,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
  },
  item: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemWithModalWrapper: { flexDirection: 'row' },
  deleteBtn: {
    color: Colors.warningText,
  },
  loader: { marginLeft: BASE_PADDING },
});
