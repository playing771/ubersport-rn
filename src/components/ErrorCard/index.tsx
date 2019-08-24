import React from 'react';
import Card from '../GeneralCard/index';
import { StyleSheet, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { View as AnimatedView } from 'react-native-animatable';

interface IProps {
  error: string;
  show?: boolean;
  position?: 'TOP' | 'BOTTOM';
  // toggleCard: ()=> void;
}

const ErrorCard = ({ error, show = true, position }: IProps) => {
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
      style={
        position
          ? position === 'TOP'
            ? { top: 0, position: 'absolute' }
            : { position: 'absolute', bottom: 0 }
          : undefined
      }
      useNativeDriver={true}
    >
      <Card wrapperStyle={styles.card} onPress={hide}>
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

const styles = StyleSheet.create({
  card: {
    height: 90,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ff5722',
    padding: 18,
    borderRadius: 8,
    marginBottom: 12,
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
