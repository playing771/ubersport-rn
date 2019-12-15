import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TextStyle } from 'react-native';

interface IProps {
  sportId: number;
  style?: TextStyle;
  size?: number;
  color?: string;
}

const defaultProps = {
  size: 35,
  color: '#3B485A',
};

export function SportIcon({ sportId, ...iconProps }: IProps) {
  switch (sportId) {
    case 1: {
      return <Ionicons {...iconProps} name="ios-football" />;
    }

    case 2: {
      return <MaterialCommunityIcons {...iconProps} name="hockey-sticks" />;
    }

    case 3: {
      return <Ionicons {...iconProps} name="ios-basketball" />;
    }

    case 4: {
      return <MaterialCommunityIcons {...iconProps} name="volleyball" />;
    }

    case 5: {
      return <MaterialCommunityIcons {...iconProps} name="target" />;
    }

    case 6: {
      return <MaterialCommunityIcons {...iconProps} name="run" />;
    }

    case 8: {
      return <Ionicons {...iconProps} name="ios-tennisball" />;
    }

    case 9: {
      return <Ionicons {...iconProps} name="ios-bicycle" />;
    }

    default: {
      return <Ionicons {...iconProps} name="ios-fitness" />;
    }
  }
}

SportIcon.defaultProps = defaultProps;
