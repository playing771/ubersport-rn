import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, ViewStyle } from 'react-native';
import { IGradientWrapperParams } from './types';

type Props = {
  gradient?: IGradientWrapperParams;
  style?: StyleProp<ViewStyle>;
};

const GradientWrapper: React.FC<Props> = props => {
  if (typeof props.style !== 'undefined' && !props.gradient) {
    console.warn('gradientColors are not provided');
  }
  return props.gradient ? (
    <LinearGradient {...props.gradient} style={[{ flex: 1 }, props.style]}>
      {props.children}
    </LinearGradient>
  ) : (
    <>{props.children}</>
  );
};

export default GradientWrapper;
