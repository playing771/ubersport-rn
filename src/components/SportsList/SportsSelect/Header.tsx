import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IProps {}

const SportFiltersHeader: React.FC<IProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    color: '#B8C1C7',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});

export default SportFiltersHeader;
