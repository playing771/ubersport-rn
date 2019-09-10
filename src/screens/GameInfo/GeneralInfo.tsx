import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet, Text } from 'react-native';
import SportIcon from '../../components/GameCard/SportIcon';
import TimeLabel from '../EditGame/Time/Label';
import GameLocationStatic from '../../components/GameLocationStatic';
import mapStyle from '../../components/GameCard/mapStyle';
import Participants from '../../components/GameCard/Participants';
import Section from '../../components/Layout/Section';
import { IGame } from '../../api/games/types';
import withTouch from '../../components/hocs/WIthTouch';

interface IProps {
  game: IGame;
  onPressParticipants: () => void;
}

const ICON_PARAMS = { color: '#B1B2B4', size: 20 };

const ParticipantsTouchable = withTouch(Participants);

const GeneralGameInfo = ({ game, onPressParticipants }: IProps) => {
  return (
    <>
      {game && (
        <Section>
          <Section.Item
            icon={<MaterialCommunityIcons name="text-short" {...ICON_PARAMS} />}
            iconPosition="BOTTOM"
            label={() => (
              <View>
                <Text
                  style={styles.subText}
                >{`${game.author.nickname}'s игра в ${game.sport.name}`}</Text>
                <Text style={styles.mainText}>{game.name}</Text>
              </View>
            )}
            side={<SportIcon sport="Football" />}
          />
          <Section.Item
            icon={<MaterialIcons name="public" {...ICON_PARAMS} />}
            label={'Открытая игра'}
            labelStyle={{ color: '#5F6B8D' }}
          />
          <Section.Item
            icon="ios-calendar"
            label={() => <TimeLabel dateStart={game.dateStart} dateEnd={game.dateEnd} />}
            labelStyle={{ color: '#5F6B8D' }}
          />
          <Section.Item
            icon="ios-pin"
            label={game.location.address}
            labelStyle={{ color: '#5F6B8D' }}
          />
          <GameLocationStatic
            style={styles.mapContainer}
            customMapStyle={mapStyle}
            location={game.location}
          />
          <ParticipantsTouchable
            textColor={'#5F6B8D'}
            max={game.minParticipants}
            participants={game.participants}
            style={styles.capacityContainer}
            onPress={onPressParticipants}
          />
          <Section.Item
            icon={<MaterialCommunityIcons name="text" {...ICON_PARAMS} />}
            label={game.description}
            labelStyle={{ color: '#5F6B8D' }}
          />
        </Section>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  // titleContainer: { paddingHorizontal: 6 },
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
});

export default GeneralGameInfo;
