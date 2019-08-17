import * as React from 'react';
import { View, Text } from 'react-native';

interface IProps {}

const DefaultModal: React.FC<IProps> = props => {
  return (
    <View>
      <Text>THIS IS DEFAULT MODAL</Text>
    </View>
  );
};

export default DefaultModal;
