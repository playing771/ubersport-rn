import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, StyleSheet, View } from 'react-native';
import withTouch from '../../../components/hocs/WIthTouch';

interface IProps {
  icon: string;
  label: string;
  extra?: string;
}

const EditTimeItemForm: React.FC<IProps> = props => {
  return (
    <View style={styles.container}>
      <Ionicons name={props.icon} size={20} color="#AABAC2" />
      <Text style={styles.text}>{props.label}</Text>
      <Text style={styles.extra}>{props.extra}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 16
  },
  text: { color: '#596588', paddingLeft: 18 },
  extra: { paddingLeft: 10, color: '#B4BFC9', fontWeight: '600' }
});

export default withTouch(EditTimeItemForm);
