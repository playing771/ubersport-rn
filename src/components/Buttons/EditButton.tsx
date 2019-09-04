import * as React from 'react';
import UButton from '../UButton/index';
import shadeBlend from '../../utils/shadeBlend';
import { StyleSheet, ViewStyle } from 'react-native';
import useAuthCheck from '../../hooks/useAuthCheck';

interface IProps {
  onPress: () => void;
  style?: ViewStyle;
  backgroundColor?: string;
  underlayColor?: string;
}

const DEFAULT_BACKGROUNDCOLOR = '#26AE60';

const styles = StyleSheet.create({
  icon: {
    fontSize: 22,
    paddingLeft: 1
  },
  btn: { width: 40, height: 40 }
});

const EditBtn = ({
  style,
  onPress,
  underlayColor,
  backgroundColor = DEFAULT_BACKGROUNDCOLOR
}: IProps) => {
  const { authCheck } = useAuthCheck();
  return (
    <UButton
      style={[styles.btn, style]}
      icon="ios-create"
      onPress={onPress}
      backgroundColor={shadeBlend(0.1, backgroundColor)}
      underlayColor={underlayColor}
      iconStyle={styles.icon}
      circle={true}
    />
  );
};

export default EditBtn;
