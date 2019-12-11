import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import ISport from '../../api/sports/Sport.type';
import { SportIcon } from '../GameCard/SportIcon';
import Card from '../GeneralCard/index';

interface IProps {
  sport: ISport;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  onPress?: (sport: ISport) => void;
  onShowUnderlay?: (value?: string) => void;
  onHideUnderlay?: () => void;
  iconColor?: string;
  title?: string;
  image?(): JSX.Element;
}

const params = {
  size: 60,
  iconColorActive: 'white',
  color: '#999a9b',
};

export function SportCard(props: IProps) {
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
      wrapperStyle={[styles.cardContainer, props.style]}
      // name={sport.name}
      id={String(sport.id)}
      renderContent={() => (
        <View
          style={[
            { justifyContent: 'center' },
            props.title ? { paddingHorizontal: 20 } : undefined,
          ]}
        >
          {props.image ? (
            props.image()
          ) : (
            <SportIcon
              sportId={sport.id}
              size={params.size}
              style={styles.cardImage}
              color={props.iconColor ? props.iconColor : params.color}
            />
          )}
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[styles.cardTitle, { color: params.color }, props.textStyle]}
          >
            {props.title ? props.title : sport.name}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  cardTitle: { fontWeight: '600', paddingVertical: 5, textAlign: 'center' },
  cardImage: { textAlign: 'center' },
});
