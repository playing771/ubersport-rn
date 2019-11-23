import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import EditBtn from '../../components/buttons/EditButton';
import Card from '../../components/GeneralCard';
import Right from '../../components/Layout/Right';
import Colors from '../../constants/Colors';
import { LeaveGameBtn } from './LeaveGameBtn';

const PARTICIPANT_TEXT = 'Вы участник';
const AUTHOR_TEXT = 'Вы модератор';
interface IProps {
  isAuthor: boolean;
  onEditBtnPress: () => void;
  style?: StyleProp<ViewStyle>;
  gameId: string;
}

export function InfoCard({ onEditBtnPress, style, isAuthor, gameId }: IProps) {
  return (
    <>
      {/* {error && <ErrorCard error={error} />} */}
      <Card wrapperStyle={[styles.mainContainer, style]} disabled={true}>
        <View style={styles.content}>
          <Ionicons name="ios-checkmark-circle-outline" style={styles.icon} color="white" />

          <Text style={styles.mainText}>{`${isAuthor ? AUTHOR_TEXT : PARTICIPANT_TEXT} !`}</Text>
          {/* <Text style={{ color: '#9FFFC6' }}>Some sub text...</Text> */}

          <Right centered={true} style={{ flexDirection: 'row' }}>
            {isAuthor && <EditBtn onPress={onEditBtnPress} />}
            <LeaveGameBtn gameId={gameId} />
          </Right>
        </View>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 60,
    backgroundColor: Colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderRadius: 0,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    flex: 1,
  },
  rounded: {
    borderRadius: 7,
  },
  mainText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    paddingLeft: 24,
    alignSelf: 'center',
  },
  icon: { fontSize: 30 },
});
