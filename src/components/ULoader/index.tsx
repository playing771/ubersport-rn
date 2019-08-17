import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  ActivityIndicatorIOSProps
} from 'react-native';

interface IProps {
  loading?: boolean;
  color?: string;
  size?: number | 'small' | 'large';
}

const ULoader = ({ loading = true, color, size }: IProps) => {
  return <ActivityIndicator animating={loading} color={'color'} size={size} />;
};

export default ULoader;
