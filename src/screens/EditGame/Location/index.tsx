import { LocationData } from 'expo-location';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ILocation } from '../../../api/games/types';
import mapStyle from '../../../components/GameCard/mapStyle';
import UMap from '../../../components/UMap';
import { HEADER_BACKGROUND } from '../../../constants/Colors';
import useNavigation from '../../../hooks/useNavigation';
import sharedStyles from '../../../sharedStyles';

export function EditLocationScreen() {
  const { getParam, goBack } = useNavigation();

  function goBackWithLocation(backLocation: ILocation) {
    const onChangeLocation = getParam('onLocationChange');
    onChangeLocation(backLocation);
    goBack();
  }

  const location: LocationData | undefined = getParam('location');

  return (
    <SafeAreaView style={[styles.container, sharedStyles.headerlessScreen]}>
      <StatusBar barStyle="light-content" />
      <UMap
        style={[styles.mapContainer]}
        customMapStyle={mapStyle}
        initialLocation={location}
        dynamicMarker={true}
        onChangeLocation={goBackWithLocation}
        myLocation={true}
      />
    </SafeAreaView>
  );
}

EditLocationScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: HEADER_BACKGROUND },
  mapContainer: { height: '100%' },
});
