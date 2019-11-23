import React from 'react';
import { NavigationStackOptions } from 'react-navigation-stack';
import GradientWrapper from '../../components/AdaptiveScreen/GradientWrapper';
import { gradient } from '../../constants/generalStyles';
import useAppContext from '../../hooks/useAppContext';
import useAuthCheck from '../../hooks/useAuthCheck';
import { NavigationRoot } from '../../navigation/roots';
import shareStyles from '../../sharedStyles';
import Profile from '../Profile';
import EditProfileButton from './EditProfileButton';

interface IProps {}

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
    headerTitleStyle: {
      color: '#fff',
      fontWeight: '400',
    },
    headerStyle: shareStyles.header,
    title: 'Ваш профиль',

    headerRight: <EditProfileButton onPress={editBtnPressHandle} />,
  };

  return options;
};

export default MyProfileScreen;
