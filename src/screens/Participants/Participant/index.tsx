import React from 'react';
import { StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';
import Card from '../../../components/GeneralCard';
import useNavigation from '../../../hooks/useNavigation';
import { NavigationRoot } from '../../../navigation/roots';
import sharedStyles from '../../../sharedStyles';
import ModalWithControls from '../ModalWithControls';
import { IParticipantWithAuthorState } from '../ParticipantsList';
import { RemoveParticipantBtn } from '../RemoveParticipantBtn';
import ParticipantRow from './ParticipantRow';

interface IProps extends IParticipantWithAuthorState {
  authorId: string;
}

// контейнер-элемент списка юзеров
export function Participant(props: IProps) {
  const { navigate } = useNavigation();

  const openProfileHandle = (userId: string): void => {
    navigate(NavigationRoot.UserInfo, {
      userId,
    });
  };

  const renderButtons = function() {
    const swipeoutBtns = [
      {
        component: <RemoveParticipantBtn variables={{ userId: props.id, gameId: props.gameId }} />,
      },
    ];
    return swipeoutBtns;
  };

  const {
    nickname,
    dateOfBirth,
    lastName,
    firstName,
    isAuthor,
    id,
    avatar,
    authorId,
    gameId,
  } = props;

  return (
    <Card wrapperStyle={styles.card}>
      <Swipeout
        backgroundColor="transparent"
        right={renderButtons()}
        close={true}
        disabled={isDisalbed(authorId, isAuthor, id)}
      >
        <ParticipantRow
          nickname={nickname}
          dateOfBirth={dateOfBirth}
          lastName={lastName}
          firstName={firstName}
          src={avatar}
          modal={({ closeModal }) => (
            <ModalWithControls
              gameId={gameId}
              authorId={authorId}
              isAuthor={isAuthor}
              participantId={id}
              openProfileHandle={id => {
                closeModal();
                openProfileHandle(id);
              }}
              onKickParticipant={closeModal}
            />
          )}
        />
      </Swipeout>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 5, ...sharedStyles.paddingHorizontal },
});

function isDisalbed(authorId: string, isAuthor: boolean, participantId: string) {
  // нельзя кикать участника, если ты не автор,
  // нельзя кикать себя
  return !isAuthor || authorId === participantId;
}
