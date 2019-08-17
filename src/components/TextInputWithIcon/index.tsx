import React from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentType } from 'react';

interface IProps extends TextInputProps {
  icon?: string;
  children?: ComponentType;
  containerStyle?: ViewStyle;
}

const TextInputWithIcon = ({
  icon,
  children,
  containerStyle,
  style,
  ...textInputProps
}: IProps) => {
  return (
    <View style={[styles.mainContainer, containerStyle]}>
      {icon ? (
        <Ionicons
          // size={}
          size={18}
          name={icon}
          style={styles.icon}
          // style={[
          //   s.btnIcon,
          //   { color: this.props.iconColor },
          //   this.props.iconStyle
          // ]}
        />
      ) : (
        children
      )}
      <TextInput style={[styles.input, style]} {...textInputProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  input: { flex: 1 },
  icon: {
    paddingHorizontal: 12,
    color: '#9CA5BF',
    backgroundColor: 'white',
    height: 42,
    lineHeight: 42
    // alignItems:'center',
    // justifyContent:'center'
  }
});

export default TextInputWithIcon;
