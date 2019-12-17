import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Region } from 'react-native-maps';
import { ILocation } from '../api/games/types';
import { isAndroid } from './deviceInfo';

export const locationUtils = {
  getMyLocationAsync,
  getRegionFromLocation,
  getFormattedAddress,
  convertLocationToExpoLocation,
  convertPositionToLocation,
};

async function getMyLocationAsync() {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status !== 'granted') {
    // throw new Error('Permission to access location was denied');
    return;
  }

  const location = await getNativeMyLocation();

  // const location = await Location.getCurrentPositionAsync({
  //   // on anroid it takew too long with hight accuracy
  //   // https://github.com/expo/expo/issues/3433
  //   accuracy: isAndroid ? Location.Accuracy.Low : Location.Accuracy.Low,
  // });

  return location;
}

function getNativeMyLocation(): Promise<Position> {
  // ?? ?????? ?????? location ?? expo ???????? ????? ????????
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        reject(error);
      }
    );
  });
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
      latitude: location.coordinates[0],
      longitude: location.coordinates[1],
      accuracy: 29, // TODO: check ?
      altitude: 186, // TODO: check ?
      heading: 0, // TODO: check ?
      speed: 0, // TODO: check ?
    },
    timestamp: Date.now(),
  };
}

function convertPositionToLocation(position: Position): Location.LocationData {
  const { altitude, heading, speed, ...cordsData } = position.coords;
  const location: Location.LocationData = {
    coords: {
      ...cordsData,
      altitude: altitude ? altitude : 0,
      heading: heading ? heading : 0,
      speed: speed ? speed : 0,
    },
    timestamp: position.timestamp,
  };
  return location;
}
