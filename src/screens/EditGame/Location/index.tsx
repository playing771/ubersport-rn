import { LocationData } from 'expo-location';
import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { NavigationStackOptions } from 'react-navigation-stack';
import { ILocation } from '../../../api/games/types';
import mapStyle from '../../../components/GameCard/mapStyle';
import GameLocation from '../../../components/GameLocation';
import getMyLocationAsync from '../../../utils/getMyLocation';

interface IProps extends NavigationInjectedProps {}

interface IState {
  // location?: ILocation;
  hasLocation: boolean;
}

const initialState: IState = {
  hasLocation: false,
};

export default class EditLocationScreen extends React.Component<IProps, IState> {
  static navigationOptions: NavigationStackOptions = {
    // title: 'Карта',
    headerTitleStyle: {
      color: '#fff',
      fontWeight: '400',
    },
    headerTransparent: true, // TODO: fix
  };

  state = initialState;
  location: LocationData | null = null;

  constructor(props: IProps) {
    super(props);

    this.location = this.props.navigation.getParam('location');
  }

  async componentDidMount() {
    if (!this.location) {
      console.log('componentDidMount');

      this.location = await getMyLocationAsync();
      this.setState({ hasLocation: true });
      console.log('getMyLocationAsync', this.location);
    }
  }

  goBackWithLocation = (location: ILocation) => {
    const onChangeLocation = this.props.navigation.getParam('onLocationChange');
    onChangeLocation(location);
    this.props.navigation.goBack();
  };

  public render() {
    return (
      <>
        {this.state.hasLocation && (
          <GameLocation
            style={{ height: '100%' }}
            customMapStyle={mapStyle}
            // location={this.state.location}
            initialLocation={this.location!}
            dynamicMarker={true}
            onChangeLocation={this.goBackWithLocation}
            myLocation={true}
          />
        )}
      </>
    );
  }
}
