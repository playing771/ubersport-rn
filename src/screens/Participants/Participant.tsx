import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserAvatar from '../../components/AvatarsGroup/UserAvatar';
import getRandomUser from '../../other/getRandomUser';
import Card from '../../components/GeneralCard/index';
import Swipeout from 'react-native-swipeout';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import getAgeFromBirthday from '../../other/getAgeFromBirthday';
import { NavigationRoot } from '../../navigation/roots';
import RemoveParticipantBtn from './RemoveParticipantBtn';
import { IParticipant } from '../../api/games/types';
import { IParticipantWithAuthorState } from './ParticipantsList';
import withTouch from '../../components/hocs/WIthTouch';
import withModal from '../../components/hocs/WithModal/index';
import ModalWithControls from './ModalWithControls';

type IProps = IParticipantWithAuthorState & NavigationInjectedProps;

interface IState {}

interface IParticipantRowProps extends Partial<IParticipant> {
  src: string;
}

// тачбл элемент списка юзеров
const ParticipantRow = withModal(
  withTouch(
    ({
      src,
      nickname,
      dateOfBirth,
      lastName,
      firstName
    }: IParticipantRowProps) => {
      return (
        <View style={styles.mainContainer}>
          <UserAvatar src={src} size={60} style={styles.avatarContainer} />
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>
              {nickname}, {getUserAge(dateOfBirth)}
            </Text>
            <Text style={styles.subText}>
              {getFullName(lastName, firstName)}
            </Text>
          </View>
        </View>
      );
    }
  )
);

// контейнер-элемент списка юзеров
class Participant extends React.Component<IProps, IState> {
  private openProfileHandle = (id: string): void => {
    this.props.navigation!.navigate(NavigationRoot.UserInfo, {
      userId: id
    });
  };

  private renderButtons() {
    const swipeoutBtns = [
      {
        component: (
          <RemoveParticipantBtn
            variables={{ userId: this.props.id, gameId: this.props.gameId }}
          />
        )
      }
    ];
    return swipeoutBtns;
  }

  public render() {
    const src = getRandomUser();
    const {
      nickname,
      dateOfBirth,
      lastName,
      firstName,
      isAuthor,
      id
    } = this.props;

    return (
      <Card wrapperStyle={styles.card}>
        <Swipeout
          backgroundColor="transparent"
          right={this.renderButtons()}
          close={true}
          disabled={!isAuthor}
        >
          <ParticipantRow
            nickname={nickname}
            dateOfBirth={dateOfBirth}
            lastName={lastName}
            firstName={firstName}
            src={src}
            modal={({ toggleModal }) => (
              <ModalWithControls
                gameId={this.props.gameId}
                isAuthor={isAuthor}
                participantId={id}
                openProfileHandle={id => {
                  toggleModal();
                  this.openProfileHandle(id);
                }}
                kickParticipantHandle={() => {
                  setTimeout(() => {
                    toggleModal();
                  }, 100);
                }}
              />
            )}
          />
        </Swipeout>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    // borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#F0F0F0'
  },
  mainContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  textContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 8
  },
  avatarContainer: {
    alignSelf: 'center'
  },
  mainText: {
    color: '#242223',
    fontWeight: '700'
  },
  subText: {
    color: '#B7B7B7',
    fontWeight: '500'
  },
  deleteBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: '#f3f3f3',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
  },
  icon: { marginLeft: 'auto', marginRight: 5 },
  card: { marginBottom: 5 }
});

function getUserAge(birthday?: number): string {
  let age: string;
  if (typeof birthday === 'undefined') {
    age = 'Возраст неизвестен';
  } else {
    age = getAgeFromBirthday(birthday) + ' Лет';
  }
  return age;
}

function getFullName(lastName: string = '', firstName: string = ''): string {
  const short: string = lastName ? lastName[0] : '';
  return `${firstName} ${short}`;
}

export default withNavigation(Participant);
