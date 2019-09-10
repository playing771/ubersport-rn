import React, { ReactElement } from 'react';
import { Optionalize } from '../../../utils/types';

import HeaderLessScreen from './HeaderlessScreen';
import { ViewStyle, Text } from 'react-native';

interface IWithHeaderLessScreenProps {}
export interface IHeaderLessScreenOptions {
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

interface IProps {
  children: ReactElement | ReactElement[];
}

const withHeaderLessScreen = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
  title: string,
  options?: IHeaderLessScreenOptions
) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  function ComponentWithHeaderLessScreen(
    props: Optionalize<T, IWithHeaderLessScreenProps> & IProps
  ) {
    return (
      // <HeaderLessScreen title={title} {...options}>

      <WrappedComponent {...(props as T)}>{props.children}</WrappedComponent>

      // </HeaderLessScreen>
    );
  }
  ComponentWithHeaderLessScreen.displayName = `withSubmitModal(${displayName})`;
  ComponentWithHeaderLessScreen.navigationOptions = {
    header: null,
  };
  // hoistNonReactStatic(ComponentWithHeaderLessScreen, WrappedComponent);
  return ComponentWithHeaderLessScreen;
};

export default withHeaderLessScreen;
