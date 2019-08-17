import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IProps {
  user: string;
  text: string;
}

const SignInScreenTitle = ({ user, text }: IProps) => (
  <View style={styles.titleContainer}>
    <Text style={styles.titleMainText}>{text}</Text>
    <Text style={styles.titleSubText}>{user}</Text>
  </View>
);

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#505B77',
    flexDirection: 'column',
    paddingVertical: 6
  },
  titleMainText: {
    color: 'white',
    // paddingVertical: 12,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  },
  titleSubText: {
    color: '#CBD6F2',
    // paddingVertical: 12,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400'
  }
});

export default SignInScreenTitle;
