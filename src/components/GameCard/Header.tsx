import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import UserAvatar from '../AvatarsGroup/UserAvatar';
import SportIcon from './SportIcon';

export interface GameDetailsCardHeaderProps {}
interface IProps {
  textColor: string;
  author: string;
  team: string;
  sport: string;
  avatar: string | null;
}

const GameDetailsCardHeader = (props: IProps) => {
  const styles = getStyles(props.textColor);
  return (
    <View style={styles.mainContainer}>
      <UserAvatar src={props.avatar} size={43} style={styles.avatarContainer} />
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>{props.author}</Text>
        <Text style={styles.subText}>{props.team}</Text>
      </View>
      <SportIcon sport={props.sport} style={styles.icon} />
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
