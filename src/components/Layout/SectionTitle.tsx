import * as React from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface IProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const UbSectionTitle: React.FC<IProps> = props => {
  return (
    <View style={props.style}>
      <Text style={props.textStyle}>{props.title}</Text>
    </View>
  );
};

export default UbSectionTitle;
