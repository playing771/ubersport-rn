import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { ILocation } from '../../api/games/types';

interface StyleProps {
  style?: StyleProp<ViewStyle>;
  customMapStyle?: any;
}

type IProps = {
  onPress?: (latLng: LatLng) => void;
  location: ILocation;
} & StyleProps &
  NavigationInjectedProps;

interface IState {
  mapSnapshot?: string;
}

const INITIAL_REGION = {
  latitude: 55.75,
  longitude: 37.61,
  latitudeDelta: 0,
  longitudeDelta: 0.05,
};

class GameLocation extends React.Component<IProps, IState> {
  mapTimer?: any;

  mapWidth: number = 0;
  mapHeight: number = 0;

  mapRef = React.createRef<MapView>();

  state: IState = {};

  componentWillUnmount() {
    if (typeof this.mapTimer !== 'undefined') {
      clearTimeout(this.mapTimer);
    }
  }

  private initStaticMap = () => {
    this.mapTimer = setTimeout(() => {
      this.takeSnapshot();
    }, 900);
  };

  private takeSnapshot = () => {
    const cb = (resolve: any, reject: any) => {
      if (this.mapRef.current) {
        const snapshot = this.mapRef.current.takeSnapshot({ format: 'jpg' });
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

  public render() {
    const { style, customMapStyle } = this.props;
    const latLng = {
      latitude: this.props.location.coordinates[0],
      longitude: this.props.location.coordinates[1],
    };
    return (
      <View style={[styles.container, style]}>
        {this.state.mapSnapshot ? (
          <Image source={{ uri: this.state.mapSnapshot }} style={{ flex: 1 }} />
        ) : (
          <View style={styles.mapWrapper}>
            <MapView
              ref={this.mapRef}
              provider={PROVIDER_GOOGLE}
              onMapReady={this.initStaticMap}
              zoomControlEnabled={false}
              style={styles.map}
              loadingEnabled={true}
              customMapStyle={[customMapStyle, { flex: 1 }]}
              initialRegion={{
                ...latLng,
                longitudeDelta: INITIAL_REGION.longitudeDelta,
                latitudeDelta: INITIAL_REGION.latitudeDelta,
              }}
            >
              <Marker coordinate={latLng}>
                <MaterialCommunityIcons name="map-marker-outline" size={40} color="red" />
              </Marker>
            </MapView>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    flex: 1,
    position: 'relative',
  },
});

export default withNavigation(GameLocation);
