import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from '../../components/buttons/BackButton';
import { SimpleCallback } from '../../utils/types';

interface IProps {
  user: string;
  text: string;
  onPress: SimpleCallback;
}

const SignInScreenTitle = ({ user, text, onPress }: IProps) => (
  <View style={styles.titleContainer}>
    <BackButton style={{ paddingLeft: 12 }} onPress={onPress} />
    <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
      <Text style={styles.titleMainText}>{text}</Text>
      <Text style={styles.titleSubText}>{user}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#505B77',
    flexDirection: 'row',
    paddingVertical: 6,
  },
  titleMainText: {
    color: 'white',
    // paddingVertical: 12,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  titleSubText: {
    color: '#CBD6F2',
    // paddingVertical: 12,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
  },
});

export default SignInScreenTitle;
