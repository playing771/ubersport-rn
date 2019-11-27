import { LocationData } from 'expo-location';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ILocation } from '../../../api/games/types';
import mapStyle from '../../../components/GameCard/mapStyle';
import UMap from '../../../components/UMap';
import { HEADER_BACKGROUND } from '../../../constants/Colors';
import useNavigation from '../../../hooks/useNavigation';
import sharedStyles from '../../../sharedStyles';
import { locationUtils } from '../../../utils/location';

const DEFAULT_LOCATION: Position = {
  coords: {
    latitude: 55.75,
    longitude: 37.61,
    accuracy: 1,
    altitude: 20,
    heading: 0,
    speed: 0,
    altitudeAccuracy: null,
  },
  timestamp: new Date().getMilliseconds(),
};

export function EditLocationScreen() {
  const { getParam, goBack } = useNavigation();
  const [location, setLocation] = useState<LocationData>();

  useEffect(() => {
    (async function() {
      const position = await locationUtils.getMyLocationAsync();
      setLocation(locationUtils.convertPositionToLocation(position || DEFAULT_LOCATION));
    })();
  }, []);

  function goBackWithLocation(backLocation: ILocation) {
    const onChangeLocation = getParam('onLocationChange');
    onChangeLocation(backLocation);
    goBack();
  }

  return (
    <SafeAreaView style={[styles.container, sharedStyles.headerlessScreen]}>
      <StatusBar barStyle="light-content" />
      {location && (
        <UMap
          style={[styles.mapContainer]}
          customMapStyle={mapStyle}
          initialLocation={location}
          dynamicMarker={true}
          onChangeLocation={goBackWithLocation}
          myLocation={true}
        />
      )}
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
