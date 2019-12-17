import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IGame } from '../../api/games/types';
import Participants from '../../components/GameCard/Blocks/ParticipantsCardBlock';
import mapStyle from '../../components/GameCard/mapStyle';
import { SportIcon } from '../../components/GameCard/SportIcon';
import GameLocationStatic from '../../components/GameLocationStatic';
import withTouch from '../../components/hocs/WIthTouch';
import Section from '../../components/Layout/Section';
import TimeLabel from '../EditGame/Form/Time/TimeLabel';

interface IProps {
  game: IGame;
  onPressParticipants: () => void;
}
const FULL_CARD_AVATAR_GROUP_LIMIT = 7;
const ICON_PARAMS = { color: '#B1B2B4', size: 20 };

const ParticipantsTouchable = withTouch(Participants);

export function GeneralGameInfo({ game, onPressParticipants }: IProps) {
  return (
    <Section>
      <Section.Item
        icon={<MaterialCommunityIcons name="text-short" {...ICON_PARAMS} />}
        iconPosition="BOTTOM"
        label={() => (
          <View>
            <Text
              style={styles.subText}
            >{`${game.author.nickname}'s игра в ${game.sport.name}`}</Text>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.mainText}>
              {game.name}
            </Text>
          </View>
        )}
        side={<SportIcon sportId={game.sport.id} />}
      />
      <Section.Item
        icon={<MaterialIcons name="public" {...ICON_PARAMS} />}
        label={'Открытая игра'}
        labelStyle={styles.mainTextColor}
      />
      <Section.Item
        icon="ios-calendar"
        label={() => <TimeLabel dateStart={game.dateStart} dateEnd={game.dateEnd} />}
        labelStyle={styles.mainTextColor}
      />
      <Section.Item
        icon="ios-pin"
        label={game.location.address}
        labelStyle={styles.mainTextColor}
      />
      <GameLocationStatic
        style={styles.mapContainer}
        customMapStyle={mapStyle}
        location={game.location}
      />
      <ParticipantsTouchable
        textColor={'#5F6B8D'}
        max={game.maxParticipants}
        min={game.minParticipants}
        participants={game.participants}
        style={styles.capacityContainer}
        onPress={onPressParticipants}
        avatarGroupLimit={FULL_CARD_AVATAR_GROUP_LIMIT}
      />
      <Section.Item
        icon={<MaterialCommunityIcons name="text" {...ICON_PARAMS} />}
        label={game.description || 'Без описания'}
        labelStyle={styles.mainTextColor}
        style={styles.description}
      />
    </Section>
  );
}

const styles = StyleSheet.create({
  // titleContainer: { paddingHorizontal: 6 },
  mainTextColor: {
    color: '#5F6B8D',
  },
  mainText: {
    color: '#5F6B8D',
    fontWeight: '500',
    paddingTop: 10,
    fontSize: 18,
  },
  subText: {
    color: '#636F8F',
    flex: 1,
  },
  optionalText: {
    color: '#AEBBC4',
    fontWeight: '500',
  },
  noPadding: {
    paddingTop: 0,
  },
  mapContainer: { height: 150, marginVertical: 12 },
  capacityContainer: { paddingHorizontal: 18 },
  description: { minHeight: 140, paddingRight: 18 },
});
