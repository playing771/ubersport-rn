import { LocationData } from 'expo-location';
import React, { Dispatch } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ILocation } from '../../../../api/games/types';
import mapStyle from '../../../../components/GameCard/mapStyle';
import UMap from '../../../../components/UMap';
import { HEADER_BACKGROUND } from '../../../../constants/Colors';
import useNavigation from '../../../../hooks/useNavigation';
import sharedStyles from '../../../../sharedStyles';
import { EditGameActions } from '../useEditGameForm';

export function EditLocationScreen() {
  const { getParam, dismiss } = useNavigation();

  function goBackWithLocation(location: ILocation) {
    const onChangeLocation: Dispatch<EditGameActions> = getParam('onLocationChange');
    onChangeLocation({ type: 'editLocation', payload: { location } });
    // не понял чем отличается от goBack, но последний иногда кидает на ввыбор типа игры
    dismiss();
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
