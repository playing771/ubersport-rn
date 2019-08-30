import React from 'react';
import Card from '../GeneralCard/index';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { useState, useEffect } from 'react';
import { View as AnimatedView } from 'react-native-animatable';

export type IErrorCardPosition = 'TOP' | 'BOTTOM' | 'CENTER';
export interface IErrorCardProps {
  error: string;
  show?: boolean;
  position?: IErrorCardPosition;
  style?: ViewStyle;
}

const ErrorCard = ({ error, show = true, position, style }: IErrorCardProps) => {
  const [visible, toggle] = useState(true);

  const hide = () => {
    toggle(false);
  };

  useEffect(() => {
    toggle(show);
  }, [show]);

  return visible && show ? (
    <AnimatedView
      animation="fadeIn"
      duration={300}
      style={getContainerPosition(position)}
      useNativeDriver={true}
    >
      <Card wrapperStyle={[styles.card, style]} onPress={hide}>
        <View>
          <Text style={styles.textMain}>Ошибка</Text>
          <Text style={styles.textSub}>{error}</Text>
        </View>
      </Card>
    </AnimatedView>
  ) : (
    <></>
  );
};

function getContainerPosition(position?: IErrorCardPosition): ViewStyle {
  switch (position) {
    case 'TOP':
      return { marginBottom: 'auto' };
    case 'CENTER':
      return { marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto' };
    case 'BOTTOM':
      return {
        marginTop: 'auto',
      };
    default:
      return undefined;
  }
}

const styles = StyleSheet.create({
  card: {
    height: 90,
    // width: '100%',
    alignSelf: 'center',
    backgroundColor: '#ff5722',
    padding: 18,
    borderRadius: 8,
    marginVertical: 12,
  },
  textMain: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    paddingBottom: 6,
  },
  textSub: { color: '#f3eded', fontSize: 14 },
});

export default ErrorCard;
