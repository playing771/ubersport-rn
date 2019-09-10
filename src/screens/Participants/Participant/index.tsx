import React from 'react';
import { StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';

import { IParticipantWithAuthorState } from '../ParticipantsList';
import { NavigationRoot } from '../../../navigation/roots';
import RemoveParticipantBtn from '../RemoveParticipantBtn';
import Card from '../../../components/GeneralCard';
import ModalWithControls from '../ModalWithControls';
import sharedStyles from '../../../sharedStyles';
import { withNavigation } from 'react-navigation';
import useNavigation from '../../../hooks/useNavigation';
import ParticipantRow from './ParticipantRow';

interface IProps extends IParticipantWithAuthorState {}

const KICK_HANDLE_TIMEOUT = 100;

// контейнер-элемент списка юзеров
function Participant(props: IProps) {
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

  const { nickname, dateOfBirth, lastName, firstName, isAuthor, id, avatar } = props;

  return (
    <Card wrapperStyle={styles.card}>
      <Swipeout
        backgroundColor="transparent"
        right={renderButtons()}
        close={true}
        disabled={!isAuthor}
      >
        <ParticipantRow
          nickname={nickname}
          dateOfBirth={dateOfBirth}
          lastName={lastName}
          firstName={firstName}
          src={avatar}
          modal={({ toggleModal }) => (
            <ModalWithControls
              gameId={props.gameId}
              isAuthor={isAuthor}
              participantId={id}
              openProfileHandle={id => {
                toggleModal();
                openProfileHandle(id);
              }}
              kickParticipantHandle={() => {
                setTimeout(() => {
                  toggleModal();
                }, KICK_HANDLE_TIMEOUT);
              }}
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

export default withNavigation(Participant);
