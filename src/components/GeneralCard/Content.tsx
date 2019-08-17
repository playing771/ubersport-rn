import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ICardContent {}

interface Style {
  container: ViewStyle;
  // text: TextStyle;
  // closeButton: ViewStyle;
  // closeText: TextStyle;
}

const CardContent: React.SFC<ICardContent> = props => {
  return <View style={[s.container]}>{props.children}</View>;
};

const s = StyleSheet.create<Style>({
  container: {
    // padding: 10
    flex: 1
  }
});

export default CardContent;
