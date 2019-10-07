import React, { useContext, useState } from 'react';
import GameLocation from '../../../components/GameLocation';
import mapStyle from '../../../components/GameCard/mapStyle';
import { NavigationInjectedProps } from 'react-navigation';
import { ILocation } from '../../../api/games/types';
import { AppContext } from '../../../utils/context/sports';
import { useUserLocationEdit } from './gql';
import { NavigationStackOptions } from 'react-navigation-stack';

type IProps = NavigationInjectedProps;

function FindOwnLocationScreen(props: IProps) {
  const { setUser, user } = useContext(AppContext);
  const locProp = props.navigation.getParam('location');
  const [location, setLocation] = useState(locProp);
  const [saveUserLocation, error] = useUserLocationEdit();

  const goBackWithLocation = (loc: ILocation) => {
    // need rethink
    if (user.id !== 'noid') {
      saveUserLocation({
        variables: { id: user.id, userInput: { location: loc } },
        refetchQueries: ['UserLocation'],
      });
    }

    props.navigation.setParams({ address: loc.address });

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

const headerOptions: NavigationStackOptions = {
  // title: 'Карта',
  headerTitleStyle: {
    color: '#fff',
    fontWeight: '400',
  },
  headerTransparent: true, // TODO: fix
};

FindOwnLocationScreen.navigationOptions = headerOptions;
export default FindOwnLocationScreen;
