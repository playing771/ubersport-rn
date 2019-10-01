import React from 'react';
import { StyleSheet, Text } from 'react-native';
import withTouch from '../../../components/hocs/WIthTouch';

interface IProps {
  label: string;
}

function EditableAndroidTimeLable({ label }: IProps) {
  return <Text style={styles.text}>{label}</Text>;
}

const styles = StyleSheet.create({
  text: { color: '#596588', fontSize: 16 },
});

export default withTouch(EditableAndroidTimeLable);
