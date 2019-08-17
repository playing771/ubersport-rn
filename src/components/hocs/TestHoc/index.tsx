import * as React from 'react';
import { ComponentType } from 'react';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { Optionalize } from '../../../other/types';
import hoistNonReactStatics from 'hoist-non-react-statics';

export interface IWithTouchInjectedProps {
  onPress?: (id?: string | any, e?: GestureResponderEvent) => void;
  itemId?: string | any;
}

interface IState {}

const withTestHoc = <P extends object>(
  ComponentToAdd: ComponentType<P & { test: string }>,
  options?: { style?: StyleProp<ViewStyle> }
) => {
  const displayName =
    ComponentToAdd.displayName || ComponentToAdd.name || 'Component';
  class ComponentWithTestHoc extends React.Component<{ test: string }, IState> {
    public static displayName = `withTouch(${displayName})`;

    // onPress = (e: GestureResponderEvent): void => {
    //   if (this.props.onPress) {
    //     this.props.onPress(this.props.itemId, e);
    //   }
    // };
    render() {
      return (
        <ComponentToAdd
          test="tewst string"
          {...this.props as P &
            Optionalize<P, IWithTouchInjectedProps | { test: string }> &
            IWithTouchInjectedProps}
        />
      );
    }
  }
  return ComponentWithTestHoc;
};

export default withTestHoc;
