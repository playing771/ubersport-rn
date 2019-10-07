import * as React from 'react';
import AdaptiveScreen from '../../components/AdaptiveScreen/index';
import { gradient } from '../../constants/generalStyles';
import Profile from '../Profile';
import { NavigationInjectedProps } from 'react-navigation';
import { NavigationStackOptions } from 'react-navigation-stack';

interface IProps extends NavigationInjectedProps {}

interface IState {}

const headerOptions: NavigationStackOptions = {
  headerTitleStyle: {
    color: '#fff',
    fontWeight: '400',
  },
  // header: null,
  title: 'Player',
  headerTransparent: true,
};

export default class UserInfoScreen extends React.Component<IProps, IState> {
  static navigationOptions = headerOptions;

  public render() {
    const userId = this.props.navigation.state.params && this.props.navigation.state.params.userId;
    return (
      <AdaptiveScreen transparentHeader={true} gradient={gradient} barStyle={'light-content'}>
        <Profile userId={userId} />
      </AdaptiveScreen>
    );
  }
}
