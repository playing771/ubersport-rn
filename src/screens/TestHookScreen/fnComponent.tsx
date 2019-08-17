import React, { useState } from 'react';
import { View, Text } from 'react-native';
import UButton from '../../components/UButton/index';

interface IProps {}

const TestHookFnScreenComponent = (props: IProps) => {
  const [count, setCount] = useState(0);

  return (
    <View>
      <UButton title="click" onPress={() => setCount(count + 1)} />
      <Text>{count}</Text>
    </View>
  );
};

export default TestHookFnScreenComponent;
