import React from 'react';
import { View, Text } from 'react-native';
import TestHookFnScreenComponent from './fnComponent';

interface IProps {}

interface IState {}

export default class TestHookComponent extends React.Component<IProps, IState> {
  public render() {
    return (
      <View>
        <Text>TEST SCRREEN HOOk</Text>
        <TestHookFnScreenComponent />
      </View>
    );
  }
}
