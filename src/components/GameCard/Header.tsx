import { Text, View, StyleSheet } from 'react-native';
import * as React from 'react';
import UserAvatar from '../AvatarsGroup/UserAvatar';
import getRandomUser from '../../other/getRandomUser';
import SportIcon from './SportIcon';

export interface GameDetailsCardHeaderProps {}
interface Props {
  textColor: string;
  author: string;
  team: string;
  sport: string;
}

const GameDetailsCardHeader: React.SFC<Props> = props => {
  const src = getRandomUser();
  const _styles = _getStyles(props.textColor);
  return (
    <View style={_styles.mainContainer}>
      <UserAvatar src={src} size={43} style={_styles.avatarContainer} />
      <View style={_styles.textContainer}>
        <Text style={_styles.mainText}>{props.author}</Text>
        <Text style={_styles.subText}>{props.team}</Text>
      </View>
      <SportIcon sport={props.sport} style={_styles.icon} />
    </View>
  );
};

const _getStyles = (textColor: string) => {
  const _styles = StyleSheet.create({
    mainContainer: { flexDirection: 'row' },
    textContainer: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 8
    },
    avatarContainer: {
      alignSelf: 'center'
    },
    mainText: {
      color: textColor,
      fontWeight: '700'
    },
    subText: {
      color: '#B7B7B7',
      fontWeight: '500'
    },
    icon: { marginLeft: 'auto', marginRight: 5 }
  });
  return _styles;
};

export default GameDetailsCardHeader;
