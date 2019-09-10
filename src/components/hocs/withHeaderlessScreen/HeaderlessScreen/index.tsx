import React, { ReactElement } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, ViewStyle } from 'react-native';

import CloseButton from './CloseButton';
import useNavigation from '../../../../hooks/useNavigation';
import sharedStyles from '../../../../sharedStyles';

interface IProps {
  children: ReactElement | ReactElement[];
  title: string;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

export default function HeaderLessScreen({ children, title, style, contentStyle }: IProps) {
  const { goBack } = useNavigation();

  const closeHanlde = () => {
    goBack();
  };

  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <View style={{}}>
        <View>{/* <CloseButton onPress={closeHanlde} /> */}</View>
        <View>
          <Text style={{}}>{title}</Text>
        </View>
        <View style={[]}>{children}</View>
      </View>
    </>
  );
}

HeaderLessScreen.navigationOptions = {
  // tslint:disable-next-line:no-null-keyword
  // header: null,
};

const styles = StyleSheet.create({});
