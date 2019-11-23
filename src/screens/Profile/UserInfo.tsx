import React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import AdaptiveScreen from '../../components/AdaptiveScreen/index';
import { gradient } from '../../constants/generalStyles';
import { defaultHeaderOptions } from '../../defaultHeaderOptions';
import Profile from '../Profile';

interface IProps extends NavigationInjectedProps {}

export default function UserInfoScreen(props: IProps) {
  const userId = props.navigation.state.params && props.navigation.state.params.userId;
  return (
    <AdaptiveScreen transparentHeader={true} gradient={gradient} barStyle={'light-content'}>
      <Profile userId={userId} />
    </AdaptiveScreen>
  );
}

UserInfoScreen.navigationOptions = {
  ...defaultHeaderOptions,
  title: 'Профиль игрока',
  headerTransparent: true,
};
