import * as React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { StyleProp, ViewStyle, View, StyleSheet, Image, Text } from 'react-native';
import { ILocation } from '../../api/games/types';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import assembleLatLng from '../../utils/assembleLatLng';
import AddressBar from './AddressBar';
import { LatLng } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UButton from '../UButton';
import Colors from '../../constants/Colors';

interface ILocationData {
  coords: {
    heading: number;
    speed: number;
    altitude: number;
    accuracy: number;
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}

interface StyleProps {
  style?: StyleProp<ViewStyle>;
  customMapStyle?: any;
}

type Props = {
  onPress?: (LocationCoords: LatLng) => void;
  onChangeLocation?: (location: ILocation) => void;
  myLocation?: boolean;
  location?: ILocation;
  dynamicMarker?: boolean;
  addressBar?: boolean;
  static?: boolean;
} & StyleProps &
  NavigationInjectedProps;

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

// const initialRegion = {
//   latitude: 50,
//   longitude: 37,
//   latitudeDelta: 1,
//   longitudeDelta: 0.0421
// };

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

class GameLocation extends React.Component<Props, State> {
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

  async componentDidMount() {
    const location: ILocation =
      this.props.navigation.state.params && this.props.navigation.state.params.location
        ? this.props.navigation.state.params.location
        : this.props.location;
    if (location) {
      // const coords = assembleLatLng(location);
      await this.setState({
        address: location.address,
        // LocationCoords: coords,
        // showMarker: true
      });
      // this.changeRegion(coords);
      await this.setState({ loading: false });
    } else {
      if (this.props.myLocation) {
        const myLocation: ILocationData = await this.getMyLocationAsync();
        const LocationCoords = assembleLatLng(myLocation.coords);
        this.toggleGeoBusy();
        const locationAddress = await this.getGeoDataFromLatLng(LocationCoords);
        this.toggleGeoBusy();
        const address = this.getFormattedAddress(locationAddress[0]);

        await this.setState({
          address,
          // LocationCoords,
          // showMarker: true
        });
        // this.changeRegion(LocationCoords);
        await this.setState({ loading: false });
      }
    }
  }

  componentWillUnmount() {
    if (typeof this.mapTimer !== 'undefined') {
      clearTimeout(this.mapTimer);
    }
  }

  private initStaticMap = () => {
    if (this.props.static) {
      // this.setState({ loading: true });
      // const bindedTakeSnapshot = this.takeSnapshot.bind(this);
      this.mapTimer = setTimeout(() => {
        this.takeSnapshot();
      }, 300);

      // this.setState({ loading: false });
    }
  };

  private async updateAdress(region: Region) {
    const locationAddress = await this.getGeoDataFromLatLng(region);
    return this.getFormattedAddress(locationAddress[0]);
  }

  private getFormattedAddress = (gd: Location.Address): string => {
    let address = '';

    if (gd.name) {
      // if (gd.city && gd.city !== gd.name) {
      //   address += gd.city + ', ';
      // }
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
    return address;
  };

  private getMyLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      // this.setState({
      //   errorMessage: 'Permission to access location was denied',
      // });
      throw new Error('Permission to access location was denied');
    }

    return Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    // this.setState({ address });
  };

  private getGeoDataFromLatLng = async (LocationCoords: Location.GeocodedLocation) => {
    const address = Location.reverseGeocodeAsync(LocationCoords);
    return address;
  };

  private takeSnapshot = () => {
    const cb = (resolve: any, reject: any) => {
      if (this.mapRef.current) {
        const snapshot = this.mapRef.current.takeSnapshot({});
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

  private goToMyLocation = async () => {
    const locationData = await this.getMyLocationAsync();
    console.log('locationData', locationData);
    if (this.mapRef.current) {
      this.mapRef.current.animateToRegion({
        ...locationData.coords,
        longitudeDelta: 0.003,
        latitudeDelta: 0,
      });
    }
  };

  private hideAddressBar = () => {
    if (this.state.addressBarVisible) {
      this.setState({ addressBarVisible: false });
    }
  };

  private submitLocation = () => {
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
        {this.state.loading ? (
          <Text>loading</Text>
        ) : (
          <>
            {this.state.addressBarVisible && <AddressBar address={address} loading={geoBusy} />}
            {this.state.mapSnapshot ? (
              <Image source={{ uri: this.state.mapSnapshot }} style={{ flex: 1 }} />
            ) : (
              <>
                <UButton
                  // style={styles.submitBtn}

                  icon="ios-compass"
                  style={{
                    // width: 40,
                    // height: 40,
                    position: 'absolute',
                    bottom: 70,
                    right: 10,
                    zIndex: 99,
                    paddingVertical: 5,
                  }}
                  backgroundColor="#f1f1f1"
                  iconStyle={{ fontSize: 34, color: '#596588' }}
                  rounded={true}
                  onPress={this.goToMyLocation}

                  // iconStyle={styles.submitBtnIcon}
                  // textStyle={styles.submitBtnText}
                  // backgroundColor={Colors.green}
                />
                <UButton
                  style={styles.submitBtn}
                  title="Сохранить"
                  icon="ios-checkmark-circle"
                  iconStyle={styles.submitBtnIcon}
                  textStyle={styles.submitBtnText}
                  backgroundColor={Colors.green}
                  rounded={true}
                  onPress={this.submitLocation}
                />
                <View style={styles.mapWrapper}>
                  <MapView
                    ref={this.mapRef}
                    provider={PROVIDER_GOOGLE}
                    onMapReady={this.initStaticMap}
                    // scrollEnabled={false}
                    zoomControlEnabled={false}
                    style={styles.map}
                    loadingEnabled={true}
                    customMapStyle={[customMapStyle, { flex: 1 }]}
                    initialRegion={
                      this.state.region
                      // (this.props.static ||
                      //   (this.props.navigation.state.params &&
                      //     this.props.navigation.state.params.location)) &&
                      // this.state.region
                      //   ? {
                      //       ...this.state.region
                      //       // latitudeDelta: 0.08,
                      //       // longitudeDelta: 0.0421
                      //     }
                      //   : undefined
                    }
                    // onRegionChange={this.onRegionChange}
                    onRegionChangeComplete={
                      this.props.dynamicMarker ? this.changeRegion : undefined
                    }
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

                {
                  <View style={styles.crosshairsContainer} pointerEvents="none">
                    <MaterialCommunityIcons name="map-marker-outline" size={40} color="red" />
                  </View>
                }
              </>
            )}
          </>
        )}
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
  crosshairsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25, // чтобы скорректировать центр для некруглых иконок маркера
  },
  submitBtn: {
    alignSelf: 'center',
    bottom: 10,
    zIndex: 999,
    width: '95%',
    height: 50,
    position: 'absolute',
  },
  submitBtnIcon: { fontSize: 24 },
  submitBtnText: { fontSize: 16 },
});

export default withNavigation(GameLocation);
