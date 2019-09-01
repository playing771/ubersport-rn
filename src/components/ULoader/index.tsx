import React from 'react';
import { ActivityIndicator, ViewStyle } from 'react-native';

type IULoaderPosition = 'LEFT' | 'CENTER' | 'RIGHT';

interface IProps {
  loading?: boolean;
  color?: string;
  size?: number | 'small' | 'large';
  style?: ViewStyle;
  position?: IULoaderPosition;
}

const ULoader = ({ loading = true, color, size, position = 'CENTER', style }: IProps) => {
  return (
    <ActivityIndicator
      animating={loading}
      color={color}
      size={size}
      style={[
        {
          alignSelf:
            position === 'CENTER' ? 'center' : position === 'LEFT' ? 'flex-start' : 'flex-end',
        },
        style,
      ]}
    />
  );
};

export default ULoader;
