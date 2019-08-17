import * as React from 'react';
import {
  TextStyle,
  StyleProp,
  GestureResponderEvent,
  StyleSheet
} from 'react-native';
import Card from '../GeneralCard/index';
import { Ionicons } from '@expo/vector-icons';
import getSportIcon from '../../constants/getSportIcon';
import { Text, ViewStyle, View } from 'react-native';

export interface CardNameObj {
  id: string;
  name: string;
}
export interface NewGameCardProps {
  sport: CardNameObj;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  onPress?: (sport: CardNameObj) => void;
  onShowUnderlay?: (value?: string) => void;
  onHideUnderlay?: () => void;
  iconColor?: string;
  title?: string;
  image?(): JSX.Element;
}

const params = {
  size: 60,
  iconColorActive: 'white',
  color: '#999a9b'
};

const SportCard = (props: NewGameCardProps): JSX.Element => {
  const { onPress, sport } = props;
  const _onPress = (e: GestureResponderEvent) => {
    if (onPress) {
      onPress(props.sport);
    }
  };

  return (
    <Card
      // underlayColor="#ff6700"
      // onShowUnderlay={onShowUnderlay}
      // onHideUnderlay={onHideUnderlay}
      onPress={_onPress}
      wrapperStyle={[s.cardContainer, props.style]}
      // name={sport.name}
      id={sport.id}
      renderContent={() => (
        <View
          style={[
            { justifyContent: 'center' },
            props.title ? { paddingHorizontal: 20 } : undefined
          ]}
        >
          {props.image ? (
            props.image()
          ) : (
            <Ionicons
              name={getSportIcon(sport.name)}
              size={params.size}
              style={s.cardImage}
              color={props.iconColor ? props.iconColor : params.color}
            />
          )}
          <Text style={[s.cardTitle, { color: params.color }, props.textStyle]}>
            {props.title ? props.title : sport.name}
          </Text>
        </View>
      )}
    />
  );
};

const s = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
  cardTitle: { fontWeight: '600', paddingVertical: 5, textAlign: 'center' },
  cardImage: { textAlign: 'center' }
});

export default SportCard;
