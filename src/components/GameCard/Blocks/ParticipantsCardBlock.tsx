import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { IParticipant } from '../../../api/games/types';
import Colors from '../../../constants/Colors';
import AvatarsGroup from '../../AvatarsGroup/index';
import UserAvatar from '../../AvatarsGroup/UserAvatar';
import { ProgressBarCardBlock } from './ProgressBarCardBlock';

interface IProps {
  textColor: string;
  max?: number;
  participants?: IParticipant[];
  style?: StyleProp<ViewStyle>;
}

const AVATAR_GROUP_LIMIT = 5;

export default function ParticipantsCardBlock({ textColor, max, participants, style }: IProps) {
  const count = participants ? participants.length : 0;

  return (
    <View style={style}>
      <View style={styles.topBarContainer}>
        <ParticipantsCountBlock max={max} count={count} textColor={textColor} />
      </View>
      {participants && (
        <AvatarsGroup
          style={styles.avatarsContainer}
          users={participants}
          limit={AVATAR_GROUP_LIMIT}
          AvatarCmp={UserAvatar}
          styleLast={{ backgroundColor: Colors.yellow }}
        />
      )}
      {<ProgressBarCardBlock progress={max ? getProgress(max, count) : 100} max={max} />}
    </View>
  );
}

function ParticipantsCountBlock({
  max,
  count,
  textColor,
}: {
  max: number;
  count: number;
  textColor: string;
}) {
  return (
    <>
      <Text style={[styles.title, { color: textColor }]}>участников</Text>
      <View style={styles.count}>
        {max ? (
          <Text style={[styles.capacity, { color: textColor }]}>{`${count} / ${max}`}</Text>
        ) : (
          <>
            <Text style={[styles.capacity, { color: textColor }]}>{`${count} / `}</Text>
            <Ionicons name="ios-infinite" size={18} style={styles.infiniteIcon} />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topBarContainer: { flexDirection: 'row', alignItems: 'center' },
  avatarsContainer: {
    paddingVertical: 10,
    marginRight: 'auto',
  },
  title: {
    // color: textColor,
    marginRight: 'auto',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  capacity: {
    // color: textColor,
    marginLeft: 'auto',
    fontWeight: '600',
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infiniteIcon: { paddingTop: 2 },
});

function getProgress(max: number, overall: number) {
  return 100 / (max / overall);
}
