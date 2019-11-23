import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Region } from 'react-native-maps';
import { ILocation } from '../api/games/types';
import { isAndroid } from './deviceInfo';

async function getMyLocationAsync() {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }

  const location = await Location.getCurrentPositionAsync({
    // on anroid it takew too long with hight accuracy
    // https://github.com/expo/expo/issues/3433
    accuracy: isAndroid ? Location.Accuracy.Low : Location.Accuracy.Low,
  });

  return location;
}

function getRegionFromLocation(location: Location.LocationData): Region {
  return {
    ...location.coords,
    longitudeDelta: 0.003,
    latitudeDelta: 0,
  };
}

function getFormattedAddress(gd: Location.Address): string {
  let address = '';

  // ANDROID
  if (isAndroid) {
    if (gd.street) {
      address += gd.street;
      if (gd.name && gd.name !== gd.street) {
        address += ', ' + gd.name;
      }
    }
    // IOS
  } else {
    if (gd.name) {
      address += gd.name;
    } else {
      if (!gd.street || !gd.city) {
        address += gd.region;
        if (gd.name && !gd.city) {
          address += ', ' + gd.name;
        }
      }
      if (gd.city) {
        address += `${address.length ? ', ' : ''}`;
        address += 'г. ' + gd.city;
        if (gd.street) {
          address += ', ';
        }
      }
      if (gd.street) {
        address += gd.street;
      }
    }
  }

  return address;
}

function convertLocationToExpoLocation(location: ILocation): Location.LocationData {
  return {
    coords: {
      longitude: location.coordinates[0],
      latitude: location.coordinates[1],
      accuracy: 29, // TODO: check ?
      altitude: 186, // TODO: check ?
      heading: 0, // TODO: check ?
      speed: 0, // TODO: check ?
    },
    timestamp: Date.now(),
  };
}

export const locationUtils = {
  getMyLocationAsync,
  getRegionFromLocation,
  getFormattedAddress,
  convertLocationToExpoLocation,
};
