import { LatLng } from "react-native-maps";

const assembleLatLng = (object: {
  latitude: number;
  longitude: number;
  [propName: string]: any;
}): LatLng => {
  return { latitude: object.latitude, longitude: object.longitude };
};

export default assembleLatLng;
