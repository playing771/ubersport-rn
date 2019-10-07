import * as React from 'react';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Platform, StatusBar, StyleProp, ViewStyle, StatusBarProps } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import Constants from 'expo-constants';
import GradientWrapper from './GradientWrapper';
import { IGradientWrapperParams } from './types';
import { Header } from 'react-navigation-stack';

export const TAB_DEFAULT_HEIGHT = 49;
export const TAB_COMPACT_HEIGHT = 29;
export const BOTTOM_BIG_NOTCH = 40;
export const BOTTOM_SM_NOTCH = 51;
export const TOP_NOTCH = 25;

export interface IAdaptiveScreenProps extends StatusBarProps {
  transparentHeader?: boolean;
  gradient?: IGradientWrapperParams;
  gradientStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  noPaddingTop?: boolean;
}

const AdaptiveScreen: React.FC<IAdaptiveScreenProps> = ({
  transparentHeader,
  gradient,
  gradientStyle,
  style,
  children,
  noPaddingTop,
  ...statusBarProps
}) => {
  const inset = transparentHeader ? _getHeaderInset() : undefined;
  return (
    <GradientWrapper gradient={gradient} style={gradientStyle}>
      <SafeAreaView style={[{ flex: 1, ...inset }, style]}>
        <StatusBar {...statusBarProps} />
        {children}
      </SafeAreaView>
    </GradientWrapper>
  );
};

export default AdaptiveScreen;

function _getHeaderInset() {
  const NOTCH_HEIGHT = isIphoneX() ? TOP_NOTCH : 0;

  const BASE_HEADER_HEIGHT = Header.HEIGHT;

  const HEADER_HEIGHT =
    Platform.OS === 'ios'
      ? BASE_HEADER_HEIGHT + NOTCH_HEIGHT
      : BASE_HEADER_HEIGHT + Constants.statusBarHeight;

  return Platform.select({
    ios: {
      top: HEADER_HEIGHT,
    },
    android: {
      paddingTop: HEADER_HEIGHT,
    },
  });
}
