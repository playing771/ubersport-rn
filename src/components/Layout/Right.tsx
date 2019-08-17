import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface Props {
  centered?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Right: React.SFC<Props> = props => {
  return (
    <View
      style={[
        _styles.container,
        props.centered ? _styles.centered : undefined,
        props.style
      ]}
    >
      {props.children}
    </View>
  );
};

const _styles = StyleSheet.create({
  container: { marginLeft: 'auto' },
  centered: { alignSelf: 'center' }
});

export default Right;
