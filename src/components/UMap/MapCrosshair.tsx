import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function MapCrosshair() {
  return (
    <View style={styles.crosshairsContainer} pointerEvents="none">
      <MaterialCommunityIcons name="map-marker-outline" size={40} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  crosshairsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25, // чтобы скорректировать центр для некруглых иконок маркера
  },
});
