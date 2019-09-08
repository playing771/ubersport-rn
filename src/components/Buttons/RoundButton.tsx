import React from 'react';
import UButton from '../UButton/index';
import shadeBlend from '../../utils/shadeBlend';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export interface IRoundButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  backgroundColor?: string;
  underlayColor?: string;
  icon?: string;
  iconStyle?: TextStyle;
  loading?: boolean;
  loadingIndicatorColor?: string;
}

const DEFAULT_BACKGROUNDCOLOR = '#71B9BB';

const styles = StyleSheet.create({
  icon: {
    fontSize: 22,
    paddingLeft: 1,
  },
  btn: { width: 40, height: 40 },
});

const RoundButton = ({
  backgroundColor = DEFAULT_BACKGROUNDCOLOR,
  style,
  iconStyle,
  ...props
}: IRoundButtonProps) => {
  // const { authCheck } = useAuthCheck();
  return (
    <UButton
      style={[styles.btn, style]}
      backgroundColor={shadeBlend(0.1, backgroundColor)}
      iconStyle={[styles.icon, iconStyle]}
      circle={true}
      {...props}
    />
  );
};

export default RoundButton;
