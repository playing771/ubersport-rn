import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { defaultHeaderOptions } from '../../defaultHeaderOptions';
import useNavigation from '../../hooks/useNavigation';
import sharedStyles, { BASE_PADDING } from '../../sharedStyles';
import { ParticipantsList } from './ParticipantsList';

interface IProps {}

const TITLE = 'Участники игры';
const SUB_TITLE =
  'Подробную информацию о каждом из участников можно увидеть, нажав на соответствующий элемент списка';

export default function ParticipantsScreen(props: IProps) {
  const { getParam } = useNavigation();
  const gameId = getParam('gameId');

  return (
    <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.titleContainer}>
        <Text style={styles.mainText}>{TITLE}</Text>
        <Text style={styles.subText}>{SUB_TITLE}</Text>
      </View>
      <ParticipantsList gameId={gameId} />
    </ScrollView>
  );
}

ParticipantsScreen.navigationOptions = {
  ...defaultHeaderOptions,
};

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    paddingTop: BASE_PADDING,
    backgroundColor: 'white',
  },
  titleContainer: { ...sharedStyles.paddingHorizontal },
  mainText: {
    color: '#333',
    fontWeight: '700',
    fontSize: 30,
  },
  subText: {
    color: '#B7B7B7',
    fontWeight: '500',
    paddingVertical: 12,
  },
});
