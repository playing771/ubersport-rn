import React, { useEffect, useState } from 'react';
import useAppContext from '../../hooks/useAppContext';
import UserInfoTab from './tabs/UserInfo/';
import FavouriteSportsTab from './tabs/FavouriteSports';
import UButton from '../../components/UButton';

import Colors, { HEADER_BACKGROUND } from '../../constants/Colors';
import { NavigationScreenProps } from 'react-navigation';
import useNavigation from '../../hooks/useNavigation';
import UTabsView from '../../components/UTabView';
import ChangePasswordTab from './tabs/ChangePassword/';
import { StyleSheet, View } from 'react-native';
import { useQuery } from 'react-apollo';
import {
  IGetUserInfoResult,
  IGetUserInfoVariables,
  GET_USER_INFO_GQL,
} from '../../api/user/withUserInfoQuery';

import ULoader from '../../components/ULoader';
import ErrorGqlCard from '../../components/ErrorCard/ErrorGqlCard';
import { Ionicons } from '@expo/vector-icons';

interface IProps extends NavigationScreenProps {}

const initialNavState = {
  index: 0,
  routes: [
    { key: '1', title: 'Личное' },
    { key: '2', title: 'Cпорт' },
    { key: '3', title: 'Пароль' },
  ],
};

const EditProfileScreen = (props: IProps) => {
  const { user } = useAppContext();
  const { setParams } = useNavigation();
  const { data, loading, error } = useQuery<IGetUserInfoResult, IGetUserInfoVariables>(
    GET_USER_INFO_GQL,
    { variables: { id: user.id } }
  );

  const [currentNavState, setTabState] = useState(initialNavState);
  const [sports, setSports] = useState<number[]>([]);

  const tabs = {
    1: () => (!loading ? <UserInfoTab id={user.id} /> : <ULoader />),
    2: () =>
      !loading ? <FavouriteSportsTab changeSportsHandle={changeSportsHandle} /> : <ULoader />,
    3: () => (!loading ? <ChangePasswordTab /> : <ULoader />),
  };

  useEffect(() => {
    setParams({ test: 'test' });
    // setSports(getUser.favoriteSports.map(sport => sport.id));
  }, []);

  if (error) {
    return <ErrorGqlCard error={error} position="BOTTOM" />;
  }

  const changeSportsHandle = (sportIds: number[]) => {
    setSports(sportIds);
  };

  const selectTabHandle = (index: number) => {
    setTabState({ ...currentNavState, index });
  };

  return (
    <UTabsView currentNavState={currentNavState} onIndexChange={selectTabHandle} tabs={tabs} />
  );
};

EditProfileScreen.navigationOptions = ({ navigation }) => {
  const clickHandle = () => {
    navigation.getParam('test');
  };

  return {
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND,
    },
    headerTitleStyle: { color: 'white' },
    headerBackTitleStyle: { color: 'white' },
    headerRight: <HeaderRightButton onPress={clickHandle} />,
  };
};

function HeaderRightButton({ onPress }: { onPress: () => void }) {
  // const { getParam } = useNavigation();

  // const pressHandle = () => {
  // 	console.log('CLICK');

  // 	console.log(getParam('save'));
  // };

  return (
    <UButton
      onPress={onPress}
      // iconStyle={{ width: 20, height: 20 }}
      backgroundColor="transparent"
      style={{ marginRight: 12 }}
      // title="Cохранить"
      textStyle={{ fontSize: 14 }}
    >
      <Ionicons name="ios-log-out" size={30} color={Colors.purle} />
      {/* <Ionicons name="ios-save" size={30} color={'white'} /> */}
      {/* <AntDesign size={24} color={'white'} name="save"></AntDesign>  */}
    </UButton>
  );
}

const styles = StyleSheet.create({});

export default EditProfileScreen;
