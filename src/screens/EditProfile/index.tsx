import React, { useEffect, useState } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import useAppContext from '../../hooks/useAppContext';
import UserInfoTab from './tabs/UserInfo/';
import FavouriteSportsTab from './tabs/FavouriteSports/index';

import { HEADER_BACKGROUND } from '../../constants/Colors';
import useNavigation from '../../hooks/useNavigation';
import UTabsView from '../../components/UTabView';
import ChangePasswordTab from './tabs/ChangePassword/';
import HeaderRightButton from './ExitProfileButton';

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

  const [currentNavState, setTabState] = useState(initialNavState);

  const tabs = {
    1: () => <UserInfoTab id={user.id} />,
    2: () => <FavouriteSportsTab userId={user.id} />,
    3: () => <ChangePasswordTab />,
  };

  useEffect(() => {
    setParams({ test: 'test' });
    // setSports(getUser.favoriteSports.map(sport => sport.id));
  }, []);

  const selectTabHandle = (index: number) => {
    setTabState({ ...currentNavState, index });
  };

  return (
    <UTabsView currentNavState={currentNavState} onIndexChange={selectTabHandle} tabs={tabs} />
  );
};

EditProfileScreen.navigationOptions = () => {
  return {
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND,
    },
    headerTitleStyle: { color: 'white' },
    headerBackTitleStyle: { color: 'white' },
    headerRight: <HeaderRightButton />,
  };
};

export default EditProfileScreen;
