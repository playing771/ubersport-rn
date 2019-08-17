import React from 'react';
import { StyleSheet, View, Text, ViewStyle, StyleProp } from 'react-native';
import ProgressBar from './ProgressBar';
import AvatarsGroup from '../AvatarsGroup/index';
import UserAvatar from '../AvatarsGroup/UserAvatar';
import { IParticipant } from '../../api/games/types';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface IProps {
  textColor: string;
  max?: number;
  min?: number;
  participants?: IParticipant[];
  style?: StyleProp<ViewStyle>;
}

// есть MAX и MIN: показываем прогрес бар по MAX и подпись про MIN
// есть только MAX: показываем прогрес бар по MAX
// есть только MIN: не показываем прогрес бар

const Participants = ({ textColor, max, min, participants, style }: IProps) => {
  console.log('Participants', max, min);

  const count = participants ? participants.length : 0;
  // const progress = 100 / (max / count);
  const styles = _getStyles(textColor);

  return (
    <View style={[styles.mainContainer, style]}>
      <View style={styles.topBarContainer}>
        <Text style={styles.title}>участников</Text>
        <View style={styles.count}>
          <Text style={styles.capacity}>{`${count} / `}</Text>
          {max ? (
            <Text style={styles.capacity}>{`${count} / ${max}`}</Text>
          ) : (
            <Ionicons
              name="ios-infinite"
              size={18}
              style={styles.infiniteIcon}
            />
          )}
        </View>
      </View>
      {participants && (
        <AvatarsGroup
          style={styles.avatarsContainer}
          users={participants}
          limit={5}
          AvatarCmp={UserAvatar}
          styleLast={{ backgroundColor: Colors.yellow }}
        />
      )}
      {max && <ProgressBar progress={getProgress(max, count)} />}
    </View>
  );
};

const _getStyles = (textColor: string) => {
  const _styles = StyleSheet.create({
    mainContainer: {},
    topBarContainer: { flexDirection: 'row', alignItems: 'center' },
    avatarsContainer: {
      paddingVertical: 10,
      marginRight: 'auto'
    },
    title: {
      color: textColor,
      marginRight: 'auto',
      fontWeight: '600',
      fontSize: 12,
      textTransform: 'uppercase'
    },
    capacity: {
      color: textColor,
      marginLeft: 'auto',
      fontWeight: '600',
      fontSize: 12,
      justifyContent: 'center',
      alignItems: 'center'
    },
    count: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    infiniteIcon: { paddingTop: 2 }
  });
  return _styles;
};

function getProgress(max: number, overall: number) {
  return 100 / (max / overall);
}

export default Participants;
