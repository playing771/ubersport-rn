import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import mapStyle from '../../components/GameCard/mapStyle';
import { ILocation } from '../../api/games/types';
import AdaptiveScreen from '../../components/AdaptiveScreen/index';
import GameLocation from '../../components/GameLocation';
import { gradient } from '../../constants/generalStyles';

type Props = {} & NavigationInjectedProps;

type State = {
  location?: ILocation;
};

const initialState: State = {};

export default class GameLocationScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Карта',
    headerTitleStyle: {
      color: '#fff',
      fontWeight: '400'
    },
    headerTransparent: true // TODO: fix
  };

  state: State = initialState;

  componentDidMount() {
    this.setState({ location: this.props.navigation.getParam('location') });
  }

  public render(): JSX.Element {
    const onChangeLocation = this.props.navigation.getParam('onLocationChange');
    return (
      <AdaptiveScreen
        transparentHeader={true}
        gradient={gradient}
        barStyle={'light-content'}
      >
        <GameLocation
          style={{ height: '100%' }}
          customMapStyle={mapStyle}
          location={this.state.location}
          dynamicMarker={typeof this.state.location === 'undefined'}
          onChangeLocation={onChangeLocation}
          myLocation={true}
        />
      </AdaptiveScreen>
    );
  }
}
