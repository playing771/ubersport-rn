import React from 'react';
import Profile from '../Profile';
import { gradient } from '../../constants/generalStyles';
import useAuthCheck from '../../hooks/useAuthCheck';
import useAppContext from '../../hooks/useAppContext';
import EditProfileButton from './EditProfileButton';
import GradientWrapper from '../../components/AdaptiveScreen/GradientWrapper';
import shareStyles from '../../sharedStyles';
import { NavigationRoot } from '../../navigation/roots';
import { NavigationStackOptions } from 'react-navigation-stack';

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

MyProfileScreen.navigationOptions = ({ navigation }) => {
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
