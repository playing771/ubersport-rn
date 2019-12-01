import React, { useEffect, useState } from 'react';
import { NavigationStackOptions } from 'react-navigation-stack';
import UTabsView from '../../components/UTabView';
import { defaultHeaderOptions } from '../../defaultHeaderOptions';
import useAppContext from '../../hooks/useAppContext';
import useNavigation from '../../hooks/useNavigation';
import HeaderRightButton from './controls/ExitProfileButton';
import ChangePasswordTab from './tabs/ChangePassword/';
import FavouriteSportsTab from './tabs/FavouriteSports/index';
import UserInfoTab from './tabs/UserInfo/';

interface IProps extends NavigationStackOptions {}

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
    setParams({ test: 'test' }); // TODO: check???
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
    ...defaultHeaderOptions,
    headerRight: <HeaderRightButton />,
  };
};

export default EditProfileScreen;
