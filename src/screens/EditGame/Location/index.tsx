import * as React from 'react';
import GameLocation from '../../../components/GameLocation';
import mapStyle from '../../../components/GameCard/mapStyle';
import {
  NavigationInjectedProps,
  NavigationScreenOptions
} from 'react-navigation';
import { ILocation } from '../../../api/games/types';

interface IProps extends NavigationInjectedProps {}

interface IState {
  location?: ILocation;
}

const initialState: IState = {};

export default class EditLocationScreen extends React.Component<
  IProps,
  IState
> {
  static navigationOptions: NavigationScreenOptions = {
    // title: 'Карта',
    headerTitleStyle: {
      color: '#fff',
      fontWeight: '400'
    },
    headerTransparent: true // TODO: fix
  };

  state = initialState;

  componentDidMount() {
    this.setState({ location: this.props.navigation.getParam('location') });
  }

  goBackWithLocation = (location: ILocation) => {
    const onChangeLocation = this.props.navigation.getParam('onLocationChange');
    onChangeLocation(location);
    this.props.navigation.goBack();
  }

  public render() {
    return (
      <GameLocation
        style={{ height: '100%' }}
        customMapStyle={mapStyle}
        location={this.state.location}
        dynamicMarker={true}
        onChangeLocation={this.goBackWithLocation}
        myLocation={true}
      />
    );
  }
}
