import React, { useEffect, useState } from 'react';
import useAppContext from '../../hooks/useAppContext';
import UserInfoTab from './tabs/UserInfo';
import FavouriteSportsTab from './tabs/FavouriteSports';
import UButton from '../../components/UButton';

import { HEADER_BACKGROUND } from '../../constants/Colors';
import { NavigationScreenProps } from 'react-navigation';
import useNavigation from '../../hooks/useNavigation';
import UTabsView from '../../components/UTabView';
import ChangePasswordTab from './tabs/ChangePassword';
import { StyleSheet } from 'react-native';

interface IProps extends NavigationScreenProps {}

const EditProfileScreen = (props: IProps) => {
  const { user } = useAppContext();
  const { setParams } = useNavigation();
  const [currentNavState, setTabState] = useState({
    index: 0,
    routes: [
      { key: '1', title: 'Личное' },
      { key: '2', title: 'Cпорт' },
      { key: '3', title: 'Пароль' },
    ],
  });

  const selectTabHandle = (index: number) => {
    setTabState({ ...currentNavState, index });
  };

  const [sports, setSports] = useState<number[]>([]);

  useEffect(() => {
    setParams({ test: 'test' });
    // setSports(getUser.favoriteSports.map(sport => sport.id));
  }, []);

  const changeSportsHandle = (sportIds: number[]) => {
    setSports(sportIds);
  };

  return (
    <UTabsView
      currentNavState={currentNavState}
      onIndexChange={selectTabHandle}
      scenes={{
        1: () => <UserInfoTab id={user.id} />,
        2: () => <FavouriteSportsTab changeSportsHandle={changeSportsHandle} />,
        3: () => <ChangePasswordTab />,
      }}
    />
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
      title="Cохранить"
      textStyle={{ fontSize: 14 }}
    >
      {/* <Ionicons name="ios-log-out" size={30} color={Colors.purle} /> */}
      {/* <Ionicons name="ios-save" size={30} color={'white'} /> */}
      {/* <AntDesign size={24} color={'white'} name="save"></AntDesign>  */}
    </UButton>
  );
}

const styles = StyleSheet.create({});

export default EditProfileScreen;
