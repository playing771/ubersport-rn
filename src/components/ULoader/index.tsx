import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  ActivityIndicatorIOSProps,
  ViewStyle,
} from 'react-native';

interface IProps {
  loading?: boolean;
  color?: string;
  size?: number | 'small' | 'large';
  style?: ViewStyle;
}

const ULoader = ({ loading = true, color, size, style }: IProps) => {
  return <ActivityIndicator animating={loading} color={color} size={size} style={style} />;
};

export default ULoader;
