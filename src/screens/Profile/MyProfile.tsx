import React from 'react';
import { NavigationNavigatorProps, withNavigation } from 'react-navigation';
import { NavigationStackOptions } from 'react-navigation-stack';
import GradientWrapper from '../../components/AdaptiveScreen/GradientWrapper';
import { gradient } from '../../constants/generalStyles';
import { defaultHeaderOptions } from '../../defaultHeaderOptions';
import useAppContext from '../../hooks/useAppContext';
import useAuthCheck from '../../hooks/useAuthCheck';
import { NavigationRoot } from '../../navigation/roots';
import Profile from '../Profile';
import EditProfileButton from './EditProfileButton';

interface IProps extends NavigationNavigatorProps {}

function MyProfileScreen(props: IProps) {
  const { user } = useAppContext();
  const { authCheck } = useAuthCheck();

  return (
    <GradientWrapper gradient={gradient}>
      {authCheck('redirect') && <Profile userId={user.id} />}
    </GradientWrapper>
  );
}

MyProfileScreen.navigationOptions = ({ navigation }: any) => {
  const editBtnPressHandle = () => {
    navigation.navigate(NavigationRoot.EditProfile);
  };

  const options: NavigationStackOptions = {
    ...defaultHeaderOptions,
    title: 'Профиль',
    headerRight: <EditProfileButton onPress={editBtnPressHandle} />,
  };

  return options;
};

export default withNavigation(MyProfileScreen);
