import hoistNonReactStatic from 'hoist-non-react-statics';
import * as React from 'react';
import { Optionalize } from '../../../utils/types';
import AdaptiveScreen, { IAdaptiveScreenProps } from '../../AdaptiveScreen/index';

interface IWithAdaptiveScreenProps {}

export interface IAdaptiveScreenOptions extends IAdaptiveScreenProps {}

interface IProps {}

interface IState {}

const withAdaptiveScreen = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
  options?: IAdaptiveScreenOptions
) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  class ComponentWithAdaptiveScreen extends React.Component<
    Optionalize<T, IWithAdaptiveScreenProps> & IProps,
    IState
  > {
    public static displayName = `withAdaptiveScreen(${displayName})`;
    render() {
      return (
        <AdaptiveScreen {...options}>
          <WrappedComponent {...(this.props as T)}>{this.props.children}</WrappedComponent>
        </AdaptiveScreen>
      );
    }
  }
  return hoistNonReactStatic(ComponentWithAdaptiveScreen, WrappedComponent);
};

export default withAdaptiveScreen;
