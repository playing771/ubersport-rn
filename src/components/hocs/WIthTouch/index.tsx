import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { ComponentType } from 'react';
import { GestureResponderEvent, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Optionalize } from '../../../utils/types';

export interface IWithTouchInjectedProps {
  onPress?: (id?: string | any, e?: GestureResponderEvent) => void;
  itemId?: string | any;
  wrapperStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

interface IState {}

const withTouch = <P extends object>(
  ComponentToAdd: ComponentType<P & IWithTouchInjectedProps>
) => {
  const displayName = ComponentToAdd.displayName || ComponentToAdd.name || 'Component';
  class ComponentWithTouch extends React.Component<
    Optionalize<P, IWithTouchInjectedProps> & IWithTouchInjectedProps,
    IState
  > {
    public static displayName = `withTouch(${displayName})`;

    onPress = (e: GestureResponderEvent): void => {
      if (this.props.onPress) {
        this.props.onPress(this.props.itemId, e);
      }
    };

    private isDisabled() {
      // FIXME: ne rabotaet, why??
      return !this.props.onPress && this.props.disabled;
    }

    render() {
      // исключаем onPress из props, иначе появляется подсветка при клике
      const { wrapperStyle, onPress, ...rest } = this.props;
      return (
        <TouchableOpacity
          onPress={this.onPress}
          style={wrapperStyle}
          disabled={this.props.disabled}
        >
          <ComponentToAdd
            {...(rest as P & Optionalize<P, IWithTouchInjectedProps> & IWithTouchInjectedProps)}
          />
        </TouchableOpacity>
      );
    }
  }
  return hoistNonReactStatics(ComponentWithTouch, ComponentToAdd);
};

export default withTouch;
