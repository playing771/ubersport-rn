import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import withTouch from '../../../components/hocs/WIthTouch';

interface IProps {
  title: string;
  value: string;
  style?: StyleProp<ViewStyle>;
}

function FilterButton({ title, value, style }: IProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 12,
  },
  title: {
    color: '#dcdcdc',
    textTransform: 'uppercase',
    fontSize: 12,
    paddingBottom: 3,
    fontWeight: 'bold',
    flex: 1,
  },
  value: {
    color: '#f7f7f7',
    fontSize: 14,
    fontWeight: '300',
    flex: 1,
  },
});

export default withTouch(FilterButton);
