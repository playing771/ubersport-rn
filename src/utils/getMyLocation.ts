import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { isAndroid } from './deviceInfo';

export default async function getMyLocationAsync() {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }

  const location = await Location.getCurrentPositionAsync({
    // on anroid it takew too long with hight accuracy
    // https://github.com/expo/expo/issues/3433
    accuracy: isAndroid ? Location.Accuracy.Low : Location.Accuracy.BestForNavigation,
  });

  return location;
}
