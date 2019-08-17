import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

interface IProps {
  label?: string;
  value: string;
  onChange: (text: string) => void;
}

export default function UTextInput({ label, onChange, value }: IProps) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput value={value} onChangeText={onChange} style={styles.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingTop: 24,
    paddingBottom: 12,
    color: '#404F7A',
    fontSize: 16,
    fontWeight: '500'
  },
  text: {
    borderWidth: 1,
    borderColor: '#DFE3E7',
    height: 45,
    // lineHeight: 45,
    borderRadius: 4,
    paddingHorizontal: 12
  }
});
