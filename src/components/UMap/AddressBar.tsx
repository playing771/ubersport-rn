import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

// const defaultText = 'Выберите место проведения';

const DURATION = 2000;

interface IProps {
  address: string;
  loading: boolean;
}

function AddressBar({ address, loading }: IProps) {
  const textRef = useRef<any>();

  useEffect(() => {
    if (textRef.current) {
      textRef.current.transition({ opacity: 0 }, { opacity: 1 }, DURATION);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Text ref={textRef} style={styles.text}>
        {address}
      </Animatable.Text>
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 34,
    width: '100%',
    position: 'absolute',
    top: 90,
    zIndex: 999,
  },
  text: {
    fontSize: 26,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default AddressBar;
