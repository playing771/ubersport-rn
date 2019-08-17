import * as React from 'react';
import { Optionalize } from '../../../other/types';
import AdaptiveScreen from '../../AdaptiveScreen/index';
import { IAdaptiveScreenProps } from '../../AdaptiveScreen/index';
import hoistNonReactStatic from 'hoist-non-react-statics';

interface IWithAdaptiveScreenProps {}

export interface IAdaptiveScreenOptions extends IAdaptiveScreenProps {}

interface IProps {}

interface IState {}

const withAdaptiveScreen = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
  options?: IAdaptiveScreenOptions
) => {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  class ComponentWithAdaptiveScreen extends React.Component<
    Optionalize<T, IWithAdaptiveScreenProps> & IProps,
    IState
  > {
    public static displayName = `withSubmitModal(${displayName})`;
    render() {
      return (
        <AdaptiveScreen {...options}>
          <WrappedComponent {...this.props as T}>
            {this.props.children}
          </WrappedComponent>
        </AdaptiveScreen>
      );
    }
  }
  return hoistNonReactStatic(ComponentWithAdaptiveScreen, WrappedComponent);
};

export default withAdaptiveScreen;
