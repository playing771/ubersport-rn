import React from 'react';
import Profile from '../Profile';
import { gradient } from '../../constants/generalStyles';
import { NavigationScreenProps } from 'react-navigation';
import useAuthCheck from '../../hooks/useAuthCheck';
import useAppContext from '../../hooks/useAppContext';
import EditProfileButton from './EditProfileButton';
import GradientWrapper from '../../components/AdaptiveScreen/GradientWrapper';
import shareStyles from '../styles';
import { NavigationRoot } from '../../navigation/roots';

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

MyProfileScreen.navigationOptions = ({ navigation }: NavigationScreenProps) => {
  const editBtnPressHandle = () => {
    navigation.navigate(NavigationRoot.EditProfile);
  };

  return {
    headerTitleStyle: {
      color: '#fff',
      fontWeight: '400',
    },
    headerStyle: shareStyles.header,
    title: 'Ваш профиль',

    headerRight: <EditProfileButton onPress={editBtnPressHandle} />,
  };
};

export default MyProfileScreen;
