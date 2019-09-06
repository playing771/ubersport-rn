import * as React from 'react';
import GameLocation from '../../../components/GameLocation';
import mapStyle from '../../../components/GameCard/mapStyle';
import { NavigationInjectedProps, NavigationScreenOptions } from 'react-navigation';
import { ILocation } from '../../../api/games/types';
import { useState } from 'react';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const STATE_MUTATE = gql`
  mutation setLocation($address: string!) {
    setLocation(address: $address) @client
  }
`;
type IProps = NavigationInjectedProps;

function FindOwnLocationScreen(props: IProps) {
  const locProp = props.navigation.getParam('location');
  const [location, setLocation] = useState(locProp);

  const [toggleTodo] = useMutation(STATE_MUTATE);

  const goBackWithLocation = (loc: ILocation) => {
    console.log('LOCC', loc);

    const onChangeLocation = props.navigation.getParam('onChangeLocation');
    toggleTodo({
      variables: {
        address: loc.address,
      },
      refetchQueries: ['location']
    });
    props.navigation.setParams({ adress: loc.address });
    onChangeLocation(loc);

    props.navigation.goBack();
  };

  return (
    <GameLocation
      style={{ height: '100%' }}
      customMapStyle={mapStyle}
      location={location}
      dynamicMarker={true}
      onChangeLocation={goBackWithLocation}
      myLocation={true}
    />
  );
}

FindOwnLocationScreen.navigationOptions = {
  // title: 'Карта',
  headerTitleStyle: {
    color: '#fff',
    fontWeight: '400',
  },
  headerTransparent: true, // TODO: fix
};
export default FindOwnLocationScreen;
