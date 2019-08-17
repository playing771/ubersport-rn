import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

interface IProps {
  passed: number[];
  total: number;
}

const UWizardStepIndicator = ({ passed, total }: IProps) => {
  const rest = Array(total - passed.length).fill('');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.itemFirst} />
      {passed.map((p, index) => (
        <View style={styles.itemPassed} key={index} />
      ))}
      {rest.map((r, index) => (
        <View style={styles.itemRest} key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 2,
    backgroundColor: 'red'
  },
  itemPassed: { flex: 1, height: 2, backgroundColor: Colors.green },
  itemFirst: { width: 20, height: 2, backgroundColor: Colors.green },
  itemRest: { flex: 1, height: 3, backgroundColor: '#141720' }
});

export default UWizardStepIndicator;
