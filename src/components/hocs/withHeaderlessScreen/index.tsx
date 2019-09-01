import React, { ReactElement } from 'react';
import { Optionalize } from '../../../other/types';

import hoistNonReactStatic from 'hoist-non-react-statics';
import HeaderLessScreen from './HeaderlessScreen';

interface IWithHeaderLessScreenProps {}

export interface IHeaderLessScreenOptions {}

interface IProps {
  children: ReactElement | ReactElement[];
}

const withHeaderLessScreen = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
  title: string
) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  function ComponentWithHeaderLessScreen(
    props: Optionalize<T, IWithHeaderLessScreenProps> & IProps
  ) {
    return (
      <HeaderLessScreen title={title}>
        <WrappedComponent {...(props as T)}>{props.children}</WrappedComponent>
      </HeaderLessScreen>
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
