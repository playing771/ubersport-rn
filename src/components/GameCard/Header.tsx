import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import UserAvatar from '../AvatarsGroup/UserAvatar';
import SportIcon from './SportIcon';
import { IAuthor } from '../../api/games/types';

export interface GameDetailsCardHeaderProps {}

const USER_AVATAR_SIZE = 43;
interface IProps {
  textColor: string;
  author: IAuthor;
  sport: string;
}

const GameDetailsCardHeader = ({ author, textColor, sport }: IProps) => {
  const styles = getStyles(textColor);
  const team = undefined;
  return (
    <View style={styles.mainContainer}>
      <UserAvatar src={author.avatar} size={USER_AVATAR_SIZE} style={styles.avatarContainer} />
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>{author.firstName + ' ' + author.lastName}</Text>

        {team && <Text style={styles.subText}>{team}</Text>}
      </View>
      <SportIcon sport={sport} style={styles.icon} />
    </View>
  );
};

const getStyles = (textColor: string) => {
  const styles = StyleSheet.create({
    mainContainer: { flexDirection: 'row' },
    textContainer: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 8,
    },
    avatarContainer: {
      alignSelf: 'center',
    },
    mainText: {
      color: textColor,
      fontWeight: '700',
    },
    subText: {
      color: '#B7B7B7',
      fontWeight: '500',
    },
    icon: { marginLeft: 'auto', marginRight: 5 },
  });
  return styles;
};

export default GameDetailsCardHeader;
