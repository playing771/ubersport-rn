import * as React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';
import withTouch from '../WIthTouch';
import { Optionalize } from '../../../utils/types';

export interface IWithToggleProps {
  active?: boolean;
  activeTextStyle?: StyleProp<TextStyle>;
  activeViewStyle?: StyleProp<ViewStyle>;
}

interface IState {}

const withToggle = <P extends object>(ComponentToEnhance: React.ComponentType<P>) => {
  const displayName = ComponentToEnhance.displayName || ComponentToEnhance.name || 'Component';

  class ComponentWithToggle extends React.Component<
    Optionalize<P, IWithToggleProps> & IWithToggleProps,
    IState
  > {
    public static displayName = `withToggle(${displayName})`;

    public render() {
      return <ComponentToEnhance {...(this.props as P & Optionalize<P, IWithToggleProps>)} />;
    }
  }

  return hoistNonReactStatics(withTouch(ComponentWithToggle), ComponentToEnhance);
};

export default withToggle;
