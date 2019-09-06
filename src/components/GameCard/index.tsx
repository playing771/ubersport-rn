import React from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';

import GameDetailsCardHeader from './Header';
import GameTitle from './GameTitle';
import Participants from './Participants';
import mapStyle from './mapStyle';
import SubCard from './SubCard';
import Card from '../GeneralCard/index';
import CardPart from '../GeneralCard/CardPart';
import GameLocation from '../GameLocation/index';
import { IGame } from '../../api/games/types';
import { NavigationRoot } from '../../navigation/roots';
import useNavigation from '../../hooks/useNavigation';
import { getFormattedDate, getFormattedTime } from '../../utils/dateUtils';

interface IProps {
  game: IGame;
  simple?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (gameId: string) => void;
  onParticipantsPress?: (e: GestureResponderEvent) => void;
}

const textColor = '#242223';

export default function GameDetailsCard({ game, simple, style, onPress }: IProps) {
  const { navigate } = useNavigation();

  const cardPressHandle = (): void => {
    if (onPress) {
      onPress(game.id);
    }
  };

  const locationPressHandle = (): void => {
    navigate(NavigationRoot.Location, { location: game.location });
  };

  return (
    <Card wrapperStyle={[styles.card, style]} onPress={onPress ? cardPressHandle : undefined}>
      <>
        <CardPart bordered={false}>
          <GameDetailsCardHeader
            textColor={textColor}
            author={game.author}
            sport={game.sport.name}
          />
        </CardPart>
        <CardPart bordered={false}>
          <GameTitle
            textColor={textColor}
            title={game.name}
            // length={game.length}
          />
        </CardPart>
        <CardPart>
          <Participants
            textColor={textColor}
            max={game.maxParticipants}
            participants={game.participants}
          />
        </CardPart>
        {!simple && (
          <CardPart padded={false} onPress={locationPressHandle}>
            <GameLocation
              style={styles.mapContainer}
              customMapStyle={mapStyle}
              location={game.location}
              addressBar={false}
              static={true}
            />
          </CardPart>
        )}
        <View style={simple ? styles.subCardContainerSimple : styles.subCardContainer}>
          <SubCard
            icon="ios-pin"
            mainText={game.location.address}
            textColor={textColor}
            style={[styles.border, simple ? styles.roundedLeftBorder : undefined]}
            iconColor={'#3B485A'}
          />
          <SubCard
            icon="ios-calendar"
            mainText={getFormattedDate(game.dateStart)}
            subText={getFormattedTime(game.dateStart)}
            textColor={textColor}
            style={[styles.border, simple ? styles.roundedRightBorder : undefined]}
            iconColor={'#3B485A'}
          />
        </View>

        {!simple && (
          <CardPart bordered={false}>
            <Text style={styles.description}>{game.description}</Text>
          </CardPart>
        )}
      </>
    </Card>
  );
}

const cardBackgroundColor = '#ffffff';

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    backgroundColor: cardBackgroundColor,
    borderColor: '#CCCCCC',
    overflow: 'hidden',
    borderWidth: 0.5,
  },
  mapContainer: { height: 110 },
  border: {},
  roundedRightBorder: { borderBottomRightRadius: 6 },
  roundedLeftBorder: { borderBottomLeftRadius: 6 },
  subCardContainerSimple: {
    flexDirection: 'row',
  },
  subCardContainer: {
    flexDirection: 'column',
    height: 120,
  },
  avatarsContainer: {
    marginRight: 'auto',
    paddingVertical: 10,
  },
  description: { paddingTop: 5 },
});
