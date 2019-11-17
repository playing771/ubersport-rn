import * as Location from 'expo-location';
import * as React from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { ILocation } from '../../api/games/types';
import { locationUtils } from '../../utils/location';
import ULoader from '../ULoader';
import AddressBar from './AddressBar';
import MapCrosshair from './MapCrosshair';
import MyLocationButton from './MyLocationButton';
import SaveLocationButton from './SaveLocationButton';

interface StyleProps {
  style?: StyleProp<ViewStyle>;
  customMapStyle?: any;
}

type Props = {
  onPress?: (LocationCoords: LatLng) => void;
  onChangeLocation?: (location: ILocation) => void;
  myLocation?: boolean;
  initialLocation?: Location.LocationData;
  location?: ILocation;
  dynamicMarker?: boolean;
  addressBar?: boolean;
  static?: boolean;
} & StyleProps;

const defaultProps = { addressBar: true };

interface State {
  // LocationCoords?: LatLng;
  region: Region;
  address: string;
  showMarker: boolean;
  mapSnapshot?: string;
  loading?: boolean;
  geoBusy: boolean;
  addressBarVisible: boolean;
}

const INITIAL_REGION = {
  latitude: 55.75,
  longitude: 37.61,
  latitudeDelta: 0,
  longitudeDelta: 0.05,
};

const initialState: State = {
  address: '',
  showMarker: false,
  loading: true,
  geoBusy: false,
  region: INITIAL_REGION,
  addressBarVisible: true,
};

export default class UMap extends React.Component<Props, State> {
  static defaultProps = defaultProps;

  mapTimer?: any;

  mapWidth: number = 0;
  mapHeight: number = 0;

  mapRef = React.createRef<MapView>();

  state: State = this.props.location
    ? {
        address: this.props.location.address,
        // LocationCoords: {
        //   latitude: this.props.location.latitude,
        //   longitude: this.props.location.longitude
        // },
        region: INITIAL_REGION,
        showMarker: false,
        geoBusy: false,
        addressBarVisible: false,
      }
    : initialState;

  componentWillUnmount() {
    if (typeof this.mapTimer !== 'undefined') {
      clearTimeout(this.mapTimer);
    }
  }

  initStaticMap = () => {
    console.log('map is ready');

    if (this.props.static) {
      // this.setState({ loading: true });
      // const bindedTakeSnapshot = this.takeSnapshot.bind(this);
      this.mapTimer = setTimeout(() => {
        this.takeSnapshot();
      }, 300);

      // this.setState({ loading: false });
    }
  };

  onMapReadyHandle = async () => {
    // this.initStaticMap();
    this.setState({ loading: false });
  };

  private async updateAdress(region: Region) {
    const locationAddress = await this.getGeoDataFromLatLng(region);
    return locationUtils.getFormattedAddress(locationAddress[0]);
  }

  private getGeoDataFromLatLng = async (LocationCoords: Location.GeocodedLocation) => {
    const address = Location.reverseGeocodeAsync(LocationCoords);
    return address;
  };

  private takeSnapshot = () => {
    const cb = (resolve: any, reject: any) => {
      if (this.mapRef.current) {
        const snapshot = this.mapRef.current.takeSnapshot(undefined);
        snapshot.then((uri: string) => {
          this.setState({ mapSnapshot: uri }, () => resolve());
        });
      } else {
        reject();
      }
    };

    const bindedCb = cb.bind(this);

    return new Promise(bindedCb);
  };

  private toggleGeoBusy(geoBusy?: boolean) {
    this.setState({
      geoBusy: typeof geoBusy !== 'undefined' ? geoBusy : !this.state.geoBusy,
    });
  }

  private changeRegion = async (region: Region) => {
    // const LocationCoords = assembleLatLng(region);

    this.setState({ addressBarVisible: true, geoBusy: true });
    const address: string = await this.updateAdress(region);
    this.toggleGeoBusy(false);
    this.setState({
      region,
      address,
    });
  };

  goToMyLocation = async () => {
    const myLocation = await locationUtils.getMyLocationAsync();

    this.goToLocation(myLocation);
    return myLocation;
  };

  goToLocation = async (location: Location.LocationData) => {
    if (this.mapRef.current) {
      this.mapRef.current.animateToRegion(locationUtils.getRegionFromLocation(location));
    }
  };

  hideAddressBar = () => {
    if (this.state.addressBarVisible) {
      this.setState({ addressBarVisible: false });
    }
  };

  submitLocation = () => {
    if (this.props.onChangeLocation) {
      this.props.onChangeLocation({
        // ...assembleLatLng(this.state.region),
        coordinates: [this.state.region.longitude, this.state.region.latitude],
        address: this.state.address,
      });
    }
  };

  public render() {
    const { style, customMapStyle } = this.props;
    const { region, address, geoBusy } = this.state;

    const marker = {
      coordinate: region,
      title: 'Игра',
      description: address,
    };

    return (
      <View style={[styles.container, style]}>
        <>
          {this.state.addressBarVisible && <AddressBar address={address} loading={geoBusy} />}
          {this.state.mapSnapshot ? (
            <Image source={{ uri: this.state.mapSnapshot }} style={{ flex: 1 }} />
          ) : (
            <>
              <View style={styles.mapWrapper}>
                <MapView
                  ref={this.mapRef}
                  provider={PROVIDER_GOOGLE}
                  onMapReady={this.onMapReadyHandle}
                  // scrollEnabled={false}
                  zoomControlEnabled={false}
                  style={styles.map}
                  loadingEnabled={true}
                  customMapStyle={[customMapStyle, { flex: 1 }]}
                  // initialRegion={this.state.region}
                  initialRegion={
                    this.props.initialLocation
                      ? locationUtils.getRegionFromLocation(this.props.initialLocation)
                      : this.state.region
                  }
                  onRegionChangeComplete={this.props.dynamicMarker ? this.changeRegion : undefined}
                  onRegionChange={this.hideAddressBar}
                >
                  {this.state.region && this.state.showMarker ? (
                    <Marker
                      coordinate={this.state.region}
                      title={marker.title}
                      description={marker.description}
                    />
                  ) : (
                    undefined
                  )}
                </MapView>
              </View>

              <MyLocationButton onPress={this.goToMyLocation} />
              <SaveLocationButton onPress={this.submitLocation} />
              {this.state.loading ? (
                <View style={styles.loaderWrapper}>
                  <ULoader style={styles.loader} size="large" color="#434E77" />
                </View>
              ) : (
                <MapCrosshair />
              )}
            </>
          )}
        </>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    flex: 1,
  },
  mapWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    flex: 1,
    position: 'relative',
    // borderRadius: 5
  },
  marker: {
    fontSize: 50,
  },
  loader: { marginTop: 'auto', marginBottom: 'auto' },
  loaderWrapper: {
    backgroundColor: 'white',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 999,
  },
});
