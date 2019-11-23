import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IParticipant } from '../../../api/games/types';
import UserAvatar from '../../../components/AvatarsGroup/UserAvatar';
import { withModal } from '../../../components/hocs/WithModal';
import withTouch from '../../../components/hocs/WIthTouch';
import { getFullName, getUserAge } from './utils';

interface IProps extends Partial<IParticipant> {
  src: string | null;
}

function ParticipantRow({ src, nickname, dateOfBirth, lastName, firstName }: IProps) {
  return (
    <View style={styles.mainContainer}>
      <UserAvatar src={src} size={60} style={styles.avatarContainer} />
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>
          {nickname}, {getUserAge(dateOfBirth)}
        </Text>
        <Text style={styles.subText}>{getFullName(lastName, firstName)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    // paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  avatarContainer: {
    alignSelf: 'center',
  },
  mainText: {
    color: '#242223',
    fontWeight: '700',
  },
  subText: {
    color: '#B7B7B7',
    fontWeight: '500',
  },
});

export default withModal(withTouch(ParticipantRow));
// кликабельный элемент списка юзеров
