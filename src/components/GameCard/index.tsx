import React from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { IGame } from '../../api/games/types';
import { getFormattedDate, getFormattedTime } from '../../utils/dateUtils';
import CardPart from '../GeneralCard/CardPart';
import Card from '../GeneralCard/index';
import { HeaderCardBlock } from './Blocks/HeaderCardBlock';
import ParticipantsCardBlock from './Blocks/ParticipantsCardBlock';
import SubCardBlock from './Blocks/SubCardBlock';
import GameTitle from './GameTitle';

interface IProps {
  game: IGame;
  style?: StyleProp<ViewStyle>;
  onPress?: (gameId: string) => void;
  onParticipantsPress?: (e: GestureResponderEvent) => void;
}

const SIMPLE_CARD_AVATAR_GROUP_LIMIT = 5;

const textColor = '#242223';

export function GameDetailsCard({ game, style, onPress }: IProps) {
  // const { navigate } = useNavigation();

  const cardPressHandle = (): void => {
    if (onPress) {
      onPress(game.id);
    }
  };

  // const locationPressHandle = (): void => {
  //   navigate(NavigationRoot.Location, { location: game.location });
  // };

  return (
    <Card wrapperStyle={[styles.card, style]} onPress={onPress ? cardPressHandle : undefined}>
      <>
        <CardPart bordered={false}>
          <HeaderCardBlock textColor={textColor} author={game.author} sportId={game.sport.id} />
        </CardPart>
        <CardPart bordered={false}>
          <GameTitle
            textColor={textColor}
            title={game.name}
            // length={game.length}
          />
        </CardPart>
        <CardPart>
          <ParticipantsCardBlock
            textColor={textColor}
            max={game.maxParticipants}
            min={game.minParticipants}
            participants={game.participants}
            avatarGroupLimit={SIMPLE_CARD_AVATAR_GROUP_LIMIT}
          />
        </CardPart>
        {/* {!simple && (
          <CardPart padded={false} onPress={locationPressHandle}>
            <GameLocation
              style={styles.mapContainer}
              customMapStyle={mapStyle}
              location={game.location}
              addressBar={false}
              static={true}
            />
          </CardPart>
        )} */}
        <View style={styles.SubCardBlockContainerSimple}>
          <SubCardBlock
            icon="ios-pin"
            mainText={game.location.address}
            textColor={textColor}
            style={[styles.border, styles.roundedLeftBorder]}
            iconColor={'#3B485A'}
          />
          <SubCardBlock
            icon="ios-calendar"
            mainText={getFormattedDate(game.dateStart)}
            subText={getFormattedTime(game.dateStart)}
            textColor={textColor}
            style={[styles.border, styles.roundedRightBorder]}
            iconColor={'#3B485A'}
          />
        </View>
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
  SubCardBlockContainerSimple: {
    flexDirection: 'row',
  },
  SubCardBlockContainer: {
    flexDirection: 'column',
    height: 120,
  },
  avatarsContainer: {
    marginRight: 'auto',
    paddingVertical: 10,
  },
  // description: { paddingTop: 5 },
});
