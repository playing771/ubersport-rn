import * as React from 'react';

import {
  Animated,
  StyleSheet,
  Easing,
  ViewStyle,
  LayoutChangeEvent
} from 'react-native';
import { StyleProp, View } from 'react-native';

export interface IExpandProps {
  expanded: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  minWidth?: number;
  maxWidth?: number;
  maxHeight?: number;
  minHeight?: number;
  animatedValue?: Animated.AnimatedValue | Animated.AnimatedValueXY;
  style?: StyleProp<ViewStyle>;
  direction?: ExpandDirection;
  closeDuration?: number;
  openDuration?: number;
}

export interface IExpandState {
  width: Animated.AnimatedValue | Animated.AnimatedValueXY;
  maxWidth: number;
  height: Animated.AnimatedValue | Animated.AnimatedValueXY;
  maxHeight: number;
}

export enum ExpandDirection {
  Vertical = 'VERTICAL',
  Horizontal = 'HORIZONTAL'
}

const defaultProps = {
  direction: ExpandDirection.Horizontal,
  closeDuration: 300,
  openDuration: 570
};

const Expand = class extends React.Component<IExpandProps, IExpandState> {
  static defaultProps = defaultProps;
  static displayName = 'Expand';

  // state = {
  //   width:
  //     this.props.animatedValue || new Animated.Value(this.props.minWidth || 0),
  //   maxWidth: 0
  // };

  constructor(props: IExpandProps) {
    super(props);
    this.state =
      this.props.direction === ExpandDirection.Horizontal
        ? {
            width:
              this.props.animatedValue ||
              new Animated.Value(this.props.minWidth || 0),
            maxWidth: 0,
            height: new Animated.Value(0),
            maxHeight: 0
          }
        : {
            height:
              this.props.animatedValue ||
              new Animated.Value(this.props.minHeight || 0),
            maxHeight: 0,
            width: new Animated.Value(0),
            maxWidth: 0
          };
  }

  private getParamToAnimate() {
    return this.props.direction === ExpandDirection.Horizontal
      ? 'width'
      : 'height';
  }

  private getMinParamToAnimate() {
    return this.props.direction === ExpandDirection.Horizontal
      ? 'minWidth'
      : 'minHeight';
  }

  private getMaxParamToAnimate() {
    return this.props.direction === ExpandDirection.Horizontal
      ? 'maxWidth'
      : 'maxHeight';
  }

  UNSAFE_componentWillReceiveProps = (newProps: IExpandProps) => {
    if (this.props.expanded !== newProps.expanded) {
      newProps.expanded ? this.open() : this.close();
    }
  }

  close = () => {
    Animated.timing(this.state[this.getParamToAnimate()], {
      easing: Easing.inOut(Easing.ease),
      duration: this.props.closeDuration, // 300
      toValue: this.props[this.getMinParamToAnimate()] || 0
    }).start();
  }

  open = () => {
    Animated.timing(this.state[this.getParamToAnimate()], {
      easing: Easing.inOut(Easing.ease),
      duration: this.props.openDuration, // 570
      toValue: this.state[this.getMaxParamToAnimate()]
    }).start();
  }

  private setMaxWidthHeight = (event: LayoutChangeEvent) => {
    const layoutHeightWidth =
      event.nativeEvent.layout[this.getParamToAnimate()];
    if (this.props.direction === ExpandDirection.Horizontal) {
      this.setState({
        maxWidth: Math.max(
          this.props.maxWidth || layoutHeightWidth,
          layoutHeightWidth
        )
      });
    } else {
      this.setState({
        maxHeight: Math.max(
          this.props.maxHeight || layoutHeightWidth,
          layoutHeightWidth
        )
      });
    }
  }

  render(): JSX.Element {
    const { style, children, containerStyle } = this.props;

    const value = this.state[this.getParamToAnimate()];
    return (
      <View style={[style]}>
        <Animated.View
          style={[
            styles.menuStyle,
            { [this.getParamToAnimate()]: value },
            containerStyle
          ]}
        >
          <View ref="expand" onLayout={this.setMaxWidthHeight} style={style}>
            {children}
          </View>
        </Animated.View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  containerStyle: {
    overflow: 'hidden'
  },
  menuStyle: {
    // overflow: "scroll"
  }
});

export default Expand;
